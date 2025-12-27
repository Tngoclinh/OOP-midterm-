package com.hospital.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hospital.dto.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "doctor")
public class DoctorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Full name is required")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotBlank(message = "Specialization is required")
    @Column(nullable = false)
    private String specialization;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @NotNull(message = "Department ID is required")
    @Column(name = "department_id", nullable = false)
    private Integer departmentId;

    @Column(length = 200)
    private String email;

    @Column(length = 30)
    private String phone;

    @Column
    private String bio;

    @Column(name = "experience_year")
    private Integer experienceYear;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;

    @Column(name = "picture_id")
    private Integer pictureId;
}