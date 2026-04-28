package com.securepasswordmanager.securepasswordmanager.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class LoginResponseDto {
    private String token;
    private boolean isVerified;
}
