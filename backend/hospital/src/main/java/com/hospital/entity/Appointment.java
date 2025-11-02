package com.hospital.entity;

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
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "slot_id", nullable = false)
    private Long slotId;

    @Column(name = "appointment_code", length = 20, unique = true)
    private String appointmentCode;

    @Column(name = "doctor_id", nullable = false)
    private Integer doctorId;

    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @Column(name = "department_id", nullable = false)
    private Integer departmentId;

    private LocalDateTime time;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @Column(length = 500)
    private String notes;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;
}
