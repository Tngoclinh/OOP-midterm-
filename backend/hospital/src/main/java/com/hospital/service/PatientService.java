package com.hospital.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.entity.AppointmentEntity;
import com.hospital.entity.PatientEntity;
import com.hospital.repository.PatientRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository repo;

    public List<PatientEntity> findAll() {
        return repo.findAll();
    }

    public PatientEntity findById(Long identityNumber) {
        return repo.findById(identityNumber)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id=" + identityNumber));
    }

    // Query lấy lịch sử khám của bệnh nhân
    public List<AppointmentEntity> getAppointmentHistory(Long identityNumber) {
        if (!repo.existsById(identityNumber)) {
            throw new EntityNotFoundException("Patient not found with id=" + identityNumber);
        }
        return repo.findAppointmentsByIdentityNumber(identityNumber);
    }

    public PatientEntity save(PatientEntity patient) {
        patient.setLastUpdate(LocalDateTime.now());
        return repo.save(patient);
    }

    public PatientEntity update( Long identityNumber ,PatientEntity patient) {
        if (patient.getLastUpdate() == null) {
            patient.setLastUpdate(LocalDateTime.now());
        }
        if (!repo.existsById(identityNumber)) {
            throw new EntityNotFoundException("Patient not found with id=" + patient.getIdentityNumber());
        }
        patient.setLastUpdate(LocalDateTime.now());
        patient.setIdentityNumber(identityNumber);
        return repo.save(patient);
    }

    public void deleteById(Long identityNumber) {
        if (!repo.existsById(identityNumber)) {
            throw new EntityNotFoundException("Patient not found with id=" + identityNumber);
        }
        repo.deleteById(identityNumber);
    }
}