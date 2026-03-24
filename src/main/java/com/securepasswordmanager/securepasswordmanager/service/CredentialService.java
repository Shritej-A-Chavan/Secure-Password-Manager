package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.CredentialDto;
import com.securepasswordmanager.securepasswordmanager.exception.ResourceAlreadyExistsException;
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

    public CredentialDto getCredential(String email, Long id) {
        Credential credential = credentialRepository
                .findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("Credential not found"));

        return new CredentialDto(
                credential.getSite(),
                credential.getUrl(),
                credential.getPassword()
        );
    }

    public CredentialDto save(String email, CredentialDto credentialDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        try {

            Credential newCredential = new Credential();
            newCredential.setSite(credentialDto.getSite());
            newCredential.setUrl(credentialDto.getUrl());
            newCredential.setPassword(credentialDto.getPassword());
            newCredential.setUser(user);

            Credential saved = credentialRepository.save(newCredential);

            return new CredentialDto(
                    saved.getSite(),
                    saved.getUrl(),
                    saved.getPassword()
            );
        } catch (DataIntegrityViolationException e) {
            throw new ResourceAlreadyExistsException("Credential already exists for this site or url");
        }
    }

    public CredentialDto updateCredential(String email, Long id, CredentialDto credentialDto) {
        Credential credential = credentialRepository
                .findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("Credential not found"));

        credential.setSite(credentialDto.getSite());
        credential.setUrl(credentialDto.getUrl());
        credential.setPassword(credentialDto.getPassword());
        Credential saved = credentialRepository.save(credential);

        return new CredentialDto(
                saved.getSite(),
                saved.getUrl(),
                saved.getPassword()
        );
    }

    public void deleteCredential(String email, Long id) {
        Credential credential = credentialRepository
                .findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("Credential not found"));

        credentialRepository.delete(credential);
    }
}
