package com.hospital.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.dto.DoctorDTO;
import com.hospital.entity.AppointmentEntity;
import com.hospital.entity.DoctorEntity;
import com.hospital.repository.DoctorRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository repo;

    public List<DoctorEntity> findAll() {
        return repo.findAll();
    }

    // Query giống finAll ở trên nhưng mà thông tin đầy đủ hơn có cả rating
    public List<DoctorDTO> findAllDoctorsWithRating() {
        return repo.findAllDoctorsWithRating();
    }

    public Optional<DoctorEntity> findById(Integer id) {
        if(id == null){
            throw new IllegalArgumentException("Doctor id must not be null");
        }
        return repo.findById(id);
    }

    // Query tìm lịch hẹn chưa hoàn thành của bác sĩ
    public List<AppointmentEntity> findNonCompletedAppointments(Integer doctorId) {
        if (!repo.existsById(doctorId)) {
             throw new EntityNotFoundException("Doctor not found with id=" + doctorId);
        }
        System.out.println(" vao repository ");
        return repo.findNonCompletedAppointmentsByDoctor(doctorId);
    }

    public DoctorEntity save(DoctorEntity doctor) {
        if (doctor == null) throw new IllegalArgumentException("Doctor must not be null");
        doctor.setLastUpdate(LocalDateTime.now());
        return repo.save(doctor);
    }

    public DoctorEntity update( Integer id, DoctorEntity doctor) {
        if (id == null) throw new IllegalArgumentException("ID must not be null");
        if (doctor.getLastUpdate() == null) {
            doctor.setLastUpdate(LocalDateTime.now());
        }
        doctor.setId(id);
        repo.findById(doctor.getId())
            .orElseThrow(() -> new EntityNotFoundException("Doctor not found with id=" + doctor.getId()));
        return repo.save(doctor);
    }

    public void deleteById(Integer id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Doctor not found with id=" + id);
        }
        repo.deleteById(id);
    }
}