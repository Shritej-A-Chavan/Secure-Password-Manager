package com.securepasswordmanager.securepasswordmanager.service;

import com.securepasswordmanager.securepasswordmanager.dto.EmailDto;
import com.securepasswordmanager.securepasswordmanager.exception.EmailSendingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("{spring.mail.username}")
    private String sender;

    public void sendMail(EmailDto emailDto) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(emailDto.getRecipient());
            mailMessage.setText(emailDto.getBody());
            mailMessage.setSubject(emailDto.getSubject());

            mailSender.send(mailMessage);
        } catch (Exception e) {
            throw new EmailSendingException("Failed to send mail: " + e.getMessage());
        }
    }
}
