package com.ewaste.controller;

import com.ewaste.dto.ApiResponse;
import com.ewaste.dto.WasteRequestDto;
import com.ewaste.service.WasteRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final WasteRequestService wasteRequestService;

    @PostMapping(value = "/requests", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<WasteRequestDto>> submitRequest(
            @RequestPart("request") @Valid WasteRequestDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal UserDetails userDetails) {

        WasteRequestDto saved = wasteRequestService.submit(dto, image, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Request submitted successfully", saved));
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<WasteRequestDto>>> getMyRequests(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<WasteRequestDto> list = wasteRequestService.getUserRequests(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Requests fetched", list));
    }
}
