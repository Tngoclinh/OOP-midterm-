package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.entity.DoctorDaySlot;

public interface DoctorDaySlotRepository extends JpaRepository<DoctorDaySlot, Long> {

}
