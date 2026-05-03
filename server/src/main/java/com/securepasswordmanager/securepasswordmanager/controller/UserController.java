package com.securepasswordmanager.securepasswordmanager.controller;

import com.securepasswordmanager.securepasswordmanager.dto.UserDetailsDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserResponseDto;
import com.securepasswordmanager.securepasswordmanager.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getUserEmail(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(Map.of("user", userDetails.getUsername()));
    }

    @GetMapping
    public ResponseEntity<UserResponseDto> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(userService.getUser(email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@AuthenticationPrincipal UserDetails userDetails,
                                                            @RequestBody UserDetailsDto userDetailsDto,
                                                            @PathVariable Long id) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(userService.updateUser(email, userDetailsDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        String email = userDetails.getUsername();
        userService.deleteUser(email, id);
        return ResponseEntity.noContent().build();
    }
}
