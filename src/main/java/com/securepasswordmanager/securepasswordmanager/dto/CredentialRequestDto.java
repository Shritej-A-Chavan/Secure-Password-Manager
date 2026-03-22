package com.securepasswordmanager.securepasswordmanager.dto;

import lombok.Data;

@Data
public class CredentialRequestDto {
    private String site;
    private String url;
    private String password;
}
