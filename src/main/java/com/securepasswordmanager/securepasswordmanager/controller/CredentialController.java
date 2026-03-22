package com.securepasswordmanager.securepasswordmanager.controller;

import com.securepasswordmanager.securepasswordmanager.dto.CredentialRequestDto;
import com.securepasswordmanager.securepasswordmanager.dto.CredentialResponseDto;
import com.securepasswordmanager.securepasswordmanager.service.CredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/credentials")
@RequiredArgsConstructor
public class CredentialController {
    private final CredentialService credentialService;

    @PostMapping
    public ResponseEntity<CredentialResponseDto> createCredential(@AuthenticationPrincipal UserDetails userDetails,
                                                                  @RequestBody CredentialRequestDto credentialRequestDto) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(credentialService.save(email, credentialRequestDto));
    }
}
