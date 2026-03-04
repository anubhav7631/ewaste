package com.ewaste.config;

import com.ewaste.entity.User;
import com.ewaste.enums.Role;
import com.ewaste.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    @Bean
    public CommandLineRunner seedData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByEmail("admin@ewaste.com")) {
                User admin = User.builder()
                        .name("Administrator")
                        .email("admin@ewaste.com")
                        .password(passwordEncoder.encode("Admin@123"))
                        .phone("9999999999")
                        .address("Admin Office, Chennai")
                        .role(Role.ROLE_ADMIN)
                        .build();
                userRepository.save(admin);
                log.info("✅ Default admin created: admin@ewaste.com / Admin@123");
            }
        };
    }
}
