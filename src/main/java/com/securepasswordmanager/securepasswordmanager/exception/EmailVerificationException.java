package com.securepasswordmanager.securepasswordmanager.exception;

import org.springframework.http.HttpStatus;

public class EmailVerificationException extends AppException {
    public EmailVerificationException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
