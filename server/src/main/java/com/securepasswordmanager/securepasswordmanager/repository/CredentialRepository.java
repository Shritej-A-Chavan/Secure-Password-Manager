package com.securepasswordmanager.securepasswordmanager.repository;

import com.securepasswordmanager.securepasswordmanager.model.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CredentialRepository extends JpaRepository<Credential, Long> {
    Optional<Credential> findByIdAndUserEmail(Long id, String email);
}
