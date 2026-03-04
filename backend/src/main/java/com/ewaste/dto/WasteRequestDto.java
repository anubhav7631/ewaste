package com.ewaste.dto;

import com.ewaste.enums.RequestStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WasteRequestDto {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;

    @NotBlank(message = "Device type is required")
    private String deviceType;

    private String deviceDescription;

    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    private String imageUrl;

    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    private LocalDate preferredDate;
    private LocalDate scheduledDate;
    private RequestStatus status;
    private String adminNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
