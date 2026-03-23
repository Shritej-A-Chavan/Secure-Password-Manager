package com.securepasswordmanager.securepasswordmanager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = "credentials",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "site"}),
                @UniqueConstraint(columnNames = {"user_id", "url"})
        }
)
public class Credential {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String site;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
