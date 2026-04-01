package com.securepasswordmanager.securepasswordmanager.util;

public class EmailUtil {
    public static String buildOtpEmailBody(String otp) {
        return "Hi,\n\n" +
                "Use the following OTP to complete your verification:\n\n" +
                "OTP: " + otp + "\n\n" +
                "This code is valid for 10 minutes. Do not share this code with anyone.\n\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Regards,\nYourApp Team";
    }
}
