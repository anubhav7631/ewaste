package com.ewaste.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendRequestConfirmation(String to, String name, Long requestId) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject("e-Waste Request Submitted Successfully - #" + requestId);
            msg.setText(
                "Dear " + name + ",\n\n" +
                "Your e-waste disposal request (ID: #" + requestId + ") has been submitted.\n" +
                "Our team will review it and schedule a pickup soon.\n\n" +
                "Thank you for contributing to a greener environment!\n\n" +
                "Best regards,\nSmart e-Waste Team"
            );
            mailSender.send(msg);
            log.info("Confirmation email sent to {}", to);
        } catch (Exception e) {
            log.warn("Failed to send email to {}: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendStatusUpdate(String to, String name, Long requestId,
                                  String status, LocalDate scheduledDate) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject("e-Waste Request Status Updated - #" + requestId);

            StringBuilder text = new StringBuilder()
                .append("Dear ").append(name).append(",\n\n")
                .append("Your e-waste request (ID: #").append(requestId)
                .append(") status has been updated to: ").append(status).append(".\n");

            if (scheduledDate != null) {
                text.append("Pickup scheduled on: ").append(scheduledDate).append("\n");
            }
            text.append("\nThank you,\nSmart e-Waste Team");
            msg.setText(text.toString());
            mailSender.send(msg);
            log.info("Status update email sent to {}", to);
        } catch (Exception e) {
            log.warn("Failed to send status email to {}: {}", to, e.getMessage());
        }
    }
}
