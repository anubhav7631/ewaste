package com.ewaste.repository;

import com.ewaste.entity.WasteRequest;
import com.ewaste.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WasteRequestRepository extends JpaRepository<WasteRequest, Long> {
    List<WasteRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<WasteRequest> findByStatusOrderByCreatedAtDesc(RequestStatus status);
    List<WasteRequest> findAllByOrderByCreatedAtDesc();
    long countByStatus(RequestStatus status);
}
