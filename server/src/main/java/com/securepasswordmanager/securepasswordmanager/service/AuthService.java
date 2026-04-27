package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.EmailDto;
import com.securepasswordmanager.securepasswordmanager.dto.LoginDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserDetailsDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserResponseDto;
import com.securepasswordmanager.securepasswordmanager.exception.*;
import com.securepasswordmanager.securepasswordmanager.model.User;
import com.securepasswordmanager.securepasswordmanager.repository.UserRepository;
import com.securepasswordmanager.securepasswordmanager.util.EmailUtil;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailService emailService;
    @Value("${app.frontend.url}")
    private String frontendUrl;

    public UserResponseDto register(UserDetailsDto userDetailsDto) {
        String token = jwtService.generateToken(userDetailsDto.getEmail());
        String recipient = userDetailsDto.getEmail();
        String verificationLink = frontendUrl + "/verify-email?token=" + token;
        String body = EmailUtil.buildEmailBody(userDetailsDto.getUsername(), verificationLink);

        try {
            User user = new User();
            user.setUsername(userDetailsDto.getUsername());
            user.setEmail(userDetailsDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDetailsDto.getPassword()));
            user.setVerified(false);
            User saved = userRepository.save(user);

            emailService.sendMail(
                    new EmailDto(
                            recipient,
                            "Verify your email",
                            body
                    )
            );
            return new UserResponseDto(saved.getId(), saved.getUsername(), saved.getEmail(), null);
        } catch(DataIntegrityViolationException exception) {
            throw new ResourceAlreadyExistsException("An account with this email already exists");
        }
    }

    public void verifyEmail(String token) {
        Claims claims;
        try {
            claims = jwtService.extractAllClaims(token);
        } catch (Exception e) {
            throw new EmailVerificationException("Invalid or tampered token");
        }
        
        if (claims.getExpiration().before(Date.from(Instant.now()))) {
            throw new EmailVerificationException("Email verification link has expired");
        }

        String email = claims.getSubject();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailVerificationException("Invalid token"));

        if (user.isVerified())
            throw new EmailVerificationException("Email already verified");

        user.setVerified(true);
        userRepository.save(user);
    }

    public void resendVerificationMail(String email) {
        if(email == null)
            throw new EmailVerificationException("Please provide valid email id");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.isVerified())
            throw new EmailVerificationException("Email already verified");

        String token = jwtService.generateToken(user.getEmail());
        String verificationLink = frontendUrl + "/verify-email?token=" + token;
        String body = EmailUtil.buildEmailBody(user.getUsername(), verificationLink);

        emailService.sendMail(
            new EmailDto(
                user.getEmail(),
                "Verify your email",
                body
            )
        );
    }
    
    public String authenticate(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        if(userDetails == null) {
            throw new BadCredentialsException("Bad credentials");
        }

        return jwtService.generateToken(userDetails.getUsername());
    }
}
