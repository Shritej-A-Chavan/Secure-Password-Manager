package com.securepasswordmanager.securepasswordmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimpleUserResponseDto {
    private Long id;
    private String username;
    private String email;
}
