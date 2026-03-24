package com.securepasswordmanager.securepasswordmanager.controller;

import com.securepasswordmanager.securepasswordmanager.dto.*;
import com.securepasswordmanager.securepasswordmanager.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserDetailsDto userDetailsDto) {
        UserResponseDto savedUser = authService.register(userDetailsDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestBody OtpVerificationDto otpVerificationDto) {
        authService.verify(otpVerificationDto.getEmail(), otpVerificationDto.getOtp());
        return ResponseEntity.ok("Email verified successfully");
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestBody ResendOtpRequestDto request) {
        authService.resendOtp(request.getEmail());
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        String token = authService.authenticate(loginDto);
        return ResponseEntity.ok(token);
    }
}
