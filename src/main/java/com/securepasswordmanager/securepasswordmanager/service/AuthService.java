package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.LoginDto;
import com.securepasswordmanager.securepasswordmanager.dto.SimpleUserResponseDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserDetailsDto;
import com.securepasswordmanager.securepasswordmanager.exception.UserAlreadyExistsException;
import com.securepasswordmanager.securepasswordmanager.model.User;
import com.securepasswordmanager.securepasswordmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public SimpleUserResponseDto register(UserDetailsDto userDetailsDto) {
        try {
            User user = new User();
            user.setUsername(userDetailsDto.getUsername());
            user.setEmail(userDetailsDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDetailsDto.getPassword()));
            User saved = userRepository.save(user);

            return new SimpleUserResponseDto(saved.getId(), saved.getUsername(), saved.getEmail());
        } catch(DataIntegrityViolationException exception) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
    }

    public String authenticate(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        if(userDetails == null)  {
            throw new BadCredentialsException("Bad credentials");
        }

        return jwtService.generateToken(userDetails.getUsername());
    }
}
