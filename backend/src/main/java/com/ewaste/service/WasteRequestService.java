package com.ewaste.service;

import com.ewaste.dto.StatusUpdateRequest;
import com.ewaste.dto.WasteRequestDto;
import com.ewaste.entity.User;
import com.ewaste.entity.WasteRequest;
import com.ewaste.enums.RequestStatus;
import com.ewaste.repository.UserRepository;
import com.ewaste.repository.WasteRequestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class WasteRequestService {

    private final WasteRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public WasteRequestDto submit(WasteRequestDto dto, MultipartFile image, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = saveImage(image);
        }

        WasteRequest req = WasteRequest.builder()
                .user(user)
                .deviceType(dto.getDeviceType())
                .deviceDescription(dto.getDeviceDescription())
                .quantity(dto.getQuantity() != null ? dto.getQuantity() : 1)
                .imageUrl(imageUrl)
                .pickupAddress(dto.getPickupAddress())
                .preferredDate(dto.getPreferredDate())
                .status(RequestStatus.PENDING)
                .build();

        WasteRequest saved = requestRepository.save(req);

        // Re-fetch so lazy User relation is fully loaded before DTO mapping
        WasteRequest fullRequest = requestRepository.findById(saved.getId())
                .orElseThrow(() -> new RuntimeException("Failed to retrieve saved request"));

        emailService.sendRequestConfirmation(user.getEmail(), user.getName(), fullRequest.getId());
        return toDto(fullRequest);
    }

    public List<WasteRequestDto> getUserRequests(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return requestRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<WasteRequestDto> getAllRequests(RequestStatus status) {
        List<WasteRequest> list = (status != null)
                ? requestRepository.findByStatusOrderByCreatedAtDesc(status)
                : requestRepository.findAllByOrderByCreatedAtDesc();
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }

    public WasteRequestDto updateStatus(Long id, StatusUpdateRequest updateReq) {
        WasteRequest req = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));

        req.setStatus(updateReq.getStatus());
        if (updateReq.getScheduledDate() != null) req.setScheduledDate(updateReq.getScheduledDate());
        if (updateReq.getAdminNotes() != null) req.setAdminNotes(updateReq.getAdminNotes());

        WasteRequest updated = requestRepository.save(req);

        emailService.sendStatusUpdate(
                updated.getUser().getEmail(),
                updated.getUser().getName(),
                updated.getId(),
                updateReq.getStatus().name(),
                updateReq.getScheduledDate()
        );
        return toDto(updated);
    }

    public WasteRequestDto getById(Long id) {
        return requestRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    private String saveImage(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + filename;
        } catch (IOException e) {
            log.error("Image upload failed: {}", e.getMessage());
            throw new RuntimeException("Failed to save image");
        }
    }

    private WasteRequestDto toDto(WasteRequest r) {
        return WasteRequestDto.builder()
                .id(r.getId())
                .userId(r.getUser().getId())
                .userName(r.getUser().getName())
                .userEmail(r.getUser().getEmail())
                .deviceType(r.getDeviceType())
                .deviceDescription(r.getDeviceDescription())
                .quantity(r.getQuantity())
                .imageUrl(r.getImageUrl())
                .pickupAddress(r.getPickupAddress())
                .preferredDate(r.getPreferredDate())
                .scheduledDate(r.getScheduledDate())
                .status(r.getStatus())
                .adminNotes(r.getAdminNotes())
                .createdAt(r.getCreatedAt())
                .updatedAt(r.getUpdatedAt())
                .build();
    }
}