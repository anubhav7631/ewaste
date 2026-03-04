package com.ewaste.dto;

import com.ewaste.enums.RequestStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class StatusUpdateRequest {
    private RequestStatus status;
    private LocalDate scheduledDate;
    private String adminNotes;
}
