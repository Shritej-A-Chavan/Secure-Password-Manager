package com.securepasswordmanager.securepasswordmanager.exception;

public class CredentialsAlreadyExistsException extends RuntimeException {
    public CredentialsAlreadyExistsException(String message) {
        super(message);
    }
}
