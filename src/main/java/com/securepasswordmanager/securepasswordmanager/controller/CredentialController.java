package com.securepasswordmanager.securepasswordmanager.controller;

import com.securepasswordmanager.securepasswordmanager.dto.CredentialDto;
import com.securepasswordmanager.securepasswordmanager.service.CredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/credentials")
@RequiredArgsConstructor
public class CredentialController {
    private final CredentialService credentialService;

    @GetMapping("/{id}")
    public ResponseEntity<CredentialDto> getCredential(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(credentialService.getCredential(email, id));
    }

    @PostMapping
    public ResponseEntity<CredentialDto> createCredential(@AuthenticationPrincipal UserDetails userDetails,
                                                          @RequestBody CredentialDto credentialDto) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(credentialService.save(email, credentialDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CredentialDto> updateCredential(@AuthenticationPrincipal UserDetails userDetails,
                                                          @RequestBody CredentialDto credentialDto,
                                                          @PathVariable Long id) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(credentialService.updateCredential(email, id, credentialDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCredential(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable Long id) {
        String email = userDetails.getUsername();
        credentialService.deleteCredential(email, id);
        return ResponseEntity.noContent().build();
    }
}
