package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.CredentialResponseDto;
import com.securepasswordmanager.securepasswordmanager.dto.SimpleUserResponseDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserDetailsDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserResponseDto;
import com.securepasswordmanager.securepasswordmanager.exception.ResourceNotFoundException;
import com.securepasswordmanager.securepasswordmanager.exception.UserAlreadyExistsException;
import com.securepasswordmanager.securepasswordmanager.model.User;
import com.securepasswordmanager.securepasswordmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService  {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDto getUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(user.getId());
        userResponseDto.setUsername(user.getUsername());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setCredentials(
                user.getCredentials()
                        .stream()
                        .map(credential -> new CredentialResponseDto(
                                credential.getSite(),
                                credential.getUrl(),
                                credential.getPassword() // encrypted
                        ))
                        .toList()
        );

        return userResponseDto;
    }

    public SimpleUserResponseDto updateUser(String email, UserDetailsDto userDetailsDto, Long id) {
        User user = userRepository
                .findByIdAndEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setUsername(userDetailsDto.getUsername());
        user.setEmail(userDetailsDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDetailsDto.getPassword()));

        try {
            User saved = userRepository.save(user);
            return new SimpleUserResponseDto(saved.getId(), saved.getUsername(), saved.getEmail());
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException("User with email " + email + " already exists");
        }
    }

    public void deleteUser(String email, Long id) {
        User user = userRepository
                .findByIdAndEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }
}
