package com.hospital.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "department")
public class DepartmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Department name is required")
    @Column(length = 50, nullable = false)
    private String name;
    
    @Column(name = "head_doctor_id")
    private Integer headDoctorId;
    
    @Column(length = 30)
    private String phone;
    
    @Column
    private String description;
    
    @Column(name = "last_update")
    private LocalDateTime lastUpdate;
}