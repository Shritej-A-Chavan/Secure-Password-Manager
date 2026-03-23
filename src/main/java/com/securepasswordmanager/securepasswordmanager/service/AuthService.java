package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.EmailDto;
import com.securepasswordmanager.securepasswordmanager.dto.LoginDto;
import com.securepasswordmanager.securepasswordmanager.dto.SimpleUserResponseDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserDetailsDto;
import com.securepasswordmanager.securepasswordmanager.exception.*;
import com.securepasswordmanager.securepasswordmanager.model.User;
import com.securepasswordmanager.securepasswordmanager.repository.UserRepository;
import com.securepasswordmanager.securepasswordmanager.util.EmailUtil;
import com.securepasswordmanager.securepasswordmanager.util.OtpGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailService emailService;

    public SimpleUserResponseDto register(UserDetailsDto userDetailsDto) {
        String otp = OtpGenerator.generateOtp();
        String recipient = userDetailsDto.getEmail();
        String body = EmailUtil.buildOtpEmailBody(otp);

        try {
            User user = new User();
            user.setUsername(userDetailsDto.getUsername());
            user.setEmail(userDetailsDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDetailsDto.getPassword()));
            user.setOtp(passwordEncoder.encode(otp));
            user.setOtpCreatedAt(Instant.now());
            user.setVerified(false);
            User saved = userRepository.save(user);

            emailService.sendMail(
                    new EmailDto(
                            recipient,
                            "OTP Verification Code",
                            body
                    )
            );
            return new SimpleUserResponseDto(saved.getId(), saved.getUsername(), saved.getEmail());
        } catch(DataIntegrityViolationException exception) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
    }

    public void verify(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.isVerified()) {
            throw new EmailAlreadyVerifiedException("Email is already verified");
        }

        if (Instant.now().isAfter(user.getOtpCreatedAt().plus(10, ChronoUnit.MINUTES))) {
            throw new OtpException("OTP has expired");
        }

        if (user.getOtpVerificationAttempts() >= 3) {
            throw new OtpException("Maximum OTP attempts exceeded");
        }

        if (!passwordEncoder.matches(otp, user.getOtp())) {
            user.setOtpVerificationAttempts(user.getOtpVerificationAttempts() + 1);
            userRepository.save(user);

            throw new OtpException("Invalid OTP");
        }

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpVerificationAttempts(0);
        userRepository.save(user);
    }

    public void resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (user.isVerified()) {
            throw new EmailAlreadyVerifiedException("Email is already verified");
        }

        String otp = OtpGenerator.generateOtp();
        String body = EmailUtil.buildOtpEmailBody(otp);

        user.setOtp(passwordEncoder.encode(otp));
        user.setOtpCreatedAt(Instant.now());
        user.setOtpVerificationAttempts(0);

        userRepository.save(user);

        emailService.sendMail(
                new EmailDto(
                        email,
                        "OTP Verification Code",
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
        if (userDetails == null) {
            throw new BadCredentialsException("Bad credentials");
        }

        return jwtService.generateToken(userDetails.getUsername());
    }
}
