package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.entity.Doctor;
import com.hospital.repository.DoctorRepository;

@Service
public class DoctorService{

    private final DoctorRepository repo;

    public DoctorService(DoctorRepository repo) {
        this.repo = repo;
    }

    public List<Doctor> findAll() {
        return repo.findAll();
    }

    public Optional<Doctor> findById(Integer id) {
        return repo.findById(id);
    }

    public Doctor save(Doctor doctor) {
        return repo.save(doctor);
    }

    public Doctor update(Integer id, Doctor doctor) {
        doctor.setId(id);
        return repo.save(doctor);
    }

    public void deleteById(Integer id) {
        repo.deleteById(id);
    }
}
