package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.UserRegistrationDto;
import com.securepasswordmanager.securepasswordmanager.model.User;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface UserService {
    User register(UserRegistrationDto userRegistrationDto);

    @Nullable List<User> getAllUsers();
}
