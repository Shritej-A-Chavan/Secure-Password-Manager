package com.securepasswordmanager.securepasswordmanager.util;

import java.security.SecureRandom;
import java.util.Base64;

public class JwtSecretKeyGenerator {
    public static void main(String[] args) {
        byte[] key = new byte[32];
        new SecureRandom().nextBytes(key);
        System.out.println("jwt.secret=" + Base64.getEncoder().encodeToString(key));
    }
}
