package com.hospital.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "department")
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;

	@Column(nullable = false)
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