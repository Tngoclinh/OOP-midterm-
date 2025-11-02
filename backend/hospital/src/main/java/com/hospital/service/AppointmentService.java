package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.entity.Appointment;
import com.hospital.repository.AppointmentRepository;

@Service
public class AppointmentService{

    private final AppointmentRepository repo;

    public AppointmentService(AppointmentRepository repo) {
        this.repo = repo;
    }

    public List<Appointment> findAll() {
        return repo.findAll();
    }

    public Optional<Appointment> findById(Integer id) {
        return repo.findById(id);
    }

    public Appointment save(Appointment appointment) {
        return repo.save(appointment);
    }

    public Appointment update(Integer id, Appointment appointment) {
        appointment.setId(id);
        return repo.save(appointment);
    }

    public void deleteById(Integer id) {
        repo.deleteById(id);
    }
}
