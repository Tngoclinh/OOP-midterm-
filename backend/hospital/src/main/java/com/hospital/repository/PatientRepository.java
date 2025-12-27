package com.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hospital.entity.AppointmentEntity;
import com.hospital.entity.PatientEntity;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Long> {
        
    @Query("SELECT a FROM AppointmentEntity a WHERE a.patientIdentityNumber = :id ORDER BY a.time DESC")
    List<AppointmentEntity> findAppointmentsByIdentityNumber( @Param("id") Long id);
}