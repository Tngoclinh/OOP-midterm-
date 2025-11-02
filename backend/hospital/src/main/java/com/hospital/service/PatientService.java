package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.entity.Patient;
import com.hospital.repository.PatientRepository;

@Service
public class PatientService{

    private final PatientRepository repo;

    public PatientService(PatientRepository repo) {
        this.repo = repo;
    }

    public List<Patient> findAll() {
        return repo.findAll();
    }

    public Optional<Patient> findById(Integer id) {
        return repo.findById(id);
    }

    public Patient save(Patient patient) {
        return repo.save(patient);
    }

    public Patient update(Integer id, Patient patient) {
        patient.setId(id);
        return repo.save(patient);
    }

    public void deleteById(Integer id) {
        repo.deleteById(id);
    }
}
