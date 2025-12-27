package com.hospital.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class DoctorDTO {
    private Integer id;
    private String fullName;
    private Gender gender;
    private String specialization;
    private LocalDate dateOfBirth;
    private Integer departmentId;
    private String email;
    private String phone;
    private String bio;
    private Integer experienceYear;
    private Integer pictureId;
    private LocalDateTime lastUpdate;
    private Double avgRating;
    private Long totalReviews;
}
