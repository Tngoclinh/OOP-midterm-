package com.hospital.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hospital.dto.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "patient")
public class PatientEntity {

    @Id
    @NotNull(message = "Identity number is required")
    @Column(name = "identity_number")
    private Long identityNumber;

    @NotBlank(message = "Full name is required")
    @Column(name = "full_name", nullable = false, length = 50)
    private String fullName;

    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Phone number is required")
    @Column(length = 30, nullable = false)
    private String phone;

    @Column(length = 200)
    private String email;

    @Column(name = "insurance_number", length = 50)
    private String insuranceNumber;
    
    @Column(length = 100)
    private String address;

    @Column(name = "emergency_contact_phone", length = 30)
    private String emergencyContactPhone;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;
}