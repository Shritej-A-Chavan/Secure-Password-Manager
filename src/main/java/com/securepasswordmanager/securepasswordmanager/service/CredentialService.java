package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.CredentialRequestDto;
import com.securepasswordmanager.securepasswordmanager.dto.CredentialResponseDto;
import com.securepasswordmanager.securepasswordmanager.exception.CredentialsAlreadyExistsException;
import com.securepasswordmanager.securepasswordmanager.exception.ResourceNotFoundException;
import com.securepasswordmanager.securepasswordmanager.model.Credential;
import com.securepasswordmanager.securepasswordmanager.model.User;
import com.securepasswordmanager.securepasswordmanager.repository.CredentialRepository;
import com.securepasswordmanager.securepasswordmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CredentialService {
    private final CredentialRepository credentialRepository;
    private final UserRepository userRepository;

    public CredentialResponseDto save(String email, CredentialRequestDto credentialRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with email: " + email
                ));
        try {

            Credential newCredential = new Credential();
            newCredential.setSite(credentialRequestDto.getSite());
            newCredential.setUrl(credentialRequestDto.getUrl());
            newCredential.setPassword(credentialRequestDto.getPassword());
            newCredential.setUser(user);

            Credential saved = credentialRepository.save(newCredential);

            CredentialResponseDto responseDto = new CredentialResponseDto();
            responseDto.setSite(saved.getSite());
            responseDto.setUrl(saved.getUrl());

            return responseDto;
        } catch (DataIntegrityViolationException e) {
            throw new CredentialsAlreadyExistsException("Credential already exists for this site or url");
        }
    }
}
