package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.entity.AppointmentEntity;
import com.hospital.repository.AppointmentRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentService{

    private final AppointmentRepository repo;

    public List<AppointmentEntity> findAll() {
        return repo.findAll();
    }

    public Optional<AppointmentEntity> findById(Integer id) {
        if(id == null){
            throw new IllegalArgumentException("Appoinment id must not be null");
        }
        return repo.findById(id);
    }

    public AppointmentEntity save(AppointmentEntity appointment) {
        if (appointment == null) {
            throw new IllegalArgumentException("Appointment must not be null");
        }
        return repo.save(appointment);
    }

    public AppointmentEntity update(Integer id, AppointmentEntity appointment) {
        if (appointment == null) {
            throw new IllegalArgumentException("Appointment must not be null");
        }
        if (id == null) {
            throw new IllegalArgumentException("Appointment id must not be null");
        }

        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Appointment not found with id=" + id);
        }
        appointment.setId(id);
        return repo.save(appointment);
    }

    public void deleteById(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("Appointment id must not be null");
        }
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Appointment not found with id=" + id);
        }
        repo.deleteById(id);
    }
}
