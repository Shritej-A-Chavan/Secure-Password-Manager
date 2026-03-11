package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.UserRegistrationDto;
import com.securepasswordmanager.securepasswordmanager.exception.UserAlreadyExistsException;
import com.securepasswordmanager.securepasswordmanager.model.User;
import com.securepasswordmanager.securepasswordmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

//    --------Register user----------
    @Override
    public User register(UserRegistrationDto userRegistrationDto) {
        try {
            User user = new User();
            user.setUsername(userRegistrationDto.getUsername());
            user.setEmail(userRegistrationDto.getEmail());
            user.setPassword(userRegistrationDto.getPassword());
            return userRepository.save(user);
        } catch(DataIntegrityViolationException exception) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }
    }
}
