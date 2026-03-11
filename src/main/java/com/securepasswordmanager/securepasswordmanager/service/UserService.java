package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.UserRegistrationDto;
import com.securepasswordmanager.securepasswordmanager.model.User;

public interface UserService {
    User register(UserRegistrationDto userRegistrationDto);
}
