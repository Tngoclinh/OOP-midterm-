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
@Table(name = "doctor_day_slot")
public class DoctorDaySlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "doctor_id", nullable = false)
    private Integer doctorId;

    @Column(name = "start_utc", nullable = false)
    private LocalDateTime startUtc;

    @Column(name = "end_utc", nullable = false)
    private LocalDateTime endUtc;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;
}
