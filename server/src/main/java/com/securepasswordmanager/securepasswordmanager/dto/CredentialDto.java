package com.securepasswordmanager.securepasswordmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CredentialDto {
    private String site;
    private String url;
    private String password;
}
