package com.securepasswordmanager.securepasswordmanager.dto;

import lombok.Data;

@Data
public class OtpVerificationDto {
    private String email;
    private String otp;
}
