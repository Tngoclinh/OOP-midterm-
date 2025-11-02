package com.hospital.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private String specialization;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "department_id", nullable = false)
    private Integer departmentId;

    @Column(length = 200)
    private String email;

    @Column(length = 30)
    private String phone;

    private String bio;

    @Column(name = "picture_url", length = 500)
    private String pictureUrl;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;
}
