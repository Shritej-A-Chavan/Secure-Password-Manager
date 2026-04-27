package com.securepasswordmanager.securepasswordmanager.util;

public class EmailUtil {
    public static String buildEmailBody(String username, String verificationLink) {

        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'/>" +
                "</head>" +

                "<body style='margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;'>" +

                "<table width='100%' cellpadding='0' cellspacing='0' style='padding:20px 10px;'>" +
                "<tr>" +
                "<td align='center'>" +

                // Container (responsive)
                "<table width='100%' cellpadding='0' cellspacing='0' " +
                "style='max-width:500px;background:#ffffff;border-radius:10px;padding:25px;" +
                "box-shadow:0 4px 12px rgba(0,0,0,0.1);'>" +

                // Title
                "<tr>" +
                "<td align='center'>" +
                "<h2 style='margin:0;color:#333;font-size:22px;'>Verify your email</h2>" +
                "</td>" +
                "</tr>" +

                // Greeting
                "<tr><td style='padding-top:20px;color:#555;font-size:15px;line-height:1.5;'>" +
                "Hi " + (username != null ? username : "") + "," +
                "</td></tr>" +

                // Message
                "<tr><td style='padding-top:10px;color:#555;font-size:15px;line-height:1.5;'>" +
                "Welcome to <b>Secure Password Manager</b>!<br/>" +
                "Click the button below to verify your email and activate your account:" +
                "</td></tr>" +

                // Button (mobile friendly)
                "<tr>" +
                "<td align='center' style='padding:25px 0;'>" +
                "<a href='" + verificationLink + "' " +
                "style='background-color:#4CAF50;color:white;padding:14px 20px;" +
                "text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold;" +
                "display:inline-block;width:100%;max-width:250px;text-align:center;'>" +
                "Verify Email</a>" +
                "</td>" +
                "</tr>" +

                // Expiry
                "<tr><td style='color:#777;font-size:13px;text-align:center;line-height:1.4;'>" +
                "This link is valid for 15 minutes." +
                "</td></tr>" +

                // Fallback link
                "<tr><td style='padding-top:15px;color:#999;font-size:12px;text-align:center;line-height:1.4;'>" +
                "If the button doesn’t work, copy and paste this link:<br/>" +
                "<a href='" + verificationLink + "' " +
                "style='color:#4CAF50;word-break:break-all;'>" +
                verificationLink +
                "</a>" +
                "</td></tr>" +

                // Security note
                "<tr><td style='padding-top:20px;color:#999;font-size:12px;text-align:center;'>" +
                "If you didn’t create this account, you can safely ignore this email." +
                "</td></tr>" +

                // Footer
                "<tr><td style='padding-top:30px;text-align:center;color:#aaa;font-size:12px;'>" +
                "— Secure Password Manager Team" +
                "</td></tr>" +

                "</table>" +

                "</td>" +
                "</tr>" +
                "</table>" +

                "</body>" +
                "</html>";
    }
}