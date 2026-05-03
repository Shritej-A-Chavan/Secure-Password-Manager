package com.securepasswordmanager.securepasswordmanager.controller;

import com.securepasswordmanager.securepasswordmanager.dto.*;
import com.securepasswordmanager.securepasswordmanager.service.AuthService;
    
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.Duration;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserDetailsDto userDetailsDto) {
        UserResponseDto savedUser = authService.register(userDetailsDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verify(@RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/send-verification")
    public ResponseEntity<Void> resendVerificationMail(@RequestBody EmailVerificationDto emailVerificationDto) {
        System.out.println(emailVerificationDto.getEmail());
        authService.sendVerificationMail(emailVerificationDto.getEmail());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginDto loginDto) {
        String token = authService.authenticate(loginDto);
        
         ResponseCookie cookie = ResponseCookie.from("token", token)
            .httpOnly(true)
            .secure(false)
            .sameSite("lax")
            .path("/")
            .maxAge(Duration.ofDays(1))
            .build();

        return ResponseEntity
            .noContent()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .build();
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", null)
            .httpOnly(true)
            .secure(false)
            .sameSite("lax")
            .path("/")
            .maxAge(0)
            .build();

        return ResponseEntity
            .noContent()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .build();
    }
}
