package com.securepasswordmanager.securepasswordmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CredentialResponseDto {
    private String site;
    private String url;
    private String password;
}
