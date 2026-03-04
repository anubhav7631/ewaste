package com.ewaste.controller;

import com.ewaste.dto.ApiResponse;
import com.ewaste.dto.StatusUpdateRequest;
import com.ewaste.dto.WasteRequestDto;
import com.ewaste.enums.RequestStatus;
import com.ewaste.service.WasteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final WasteRequestService wasteRequestService;

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<WasteRequestDto>>> getAllRequests(
            @RequestParam(required = false) RequestStatus status) {
        List<WasteRequestDto> list = wasteRequestService.getAllRequests(status);
        return ResponseEntity.ok(ApiResponse.ok("Requests fetched", list));
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<ApiResponse<WasteRequestDto>> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Request fetched", wasteRequestService.getById(id)));
    }

    @PutMapping("/requests/{id}/status")
    public ResponseEntity<ApiResponse<WasteRequestDto>> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest updateReq) {
        WasteRequestDto updated = wasteRequestService.updateStatus(id, updateReq);
        return ResponseEntity.ok(ApiResponse.ok("Status updated successfully", updated));
    }
}
