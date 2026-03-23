package com.securepasswordmanager.securepasswordmanager.controller;

import com.securepasswordmanager.securepasswordmanager.dto.SimpleUserResponseDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserDetailsDto;
import com.securepasswordmanager.securepasswordmanager.dto.UserResponseDto;
import com.securepasswordmanager.securepasswordmanager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponseDto> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userService.getUser(userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SimpleUserResponseDto> updateUser(@AuthenticationPrincipal UserDetails userDetails,
                                                            @RequestBody UserDetailsDto userDetailsDto,
                                                            @PathVariable Long id) {
        return ResponseEntity.ok(userService.updateUser(userDetails.getUsername(), userDetailsDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        userService.deleteUser(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}
