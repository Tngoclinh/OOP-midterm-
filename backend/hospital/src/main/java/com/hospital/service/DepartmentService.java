package com.hospital.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.entity.DepartmentEntity;
import com.hospital.repository.DepartmentRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentService{

    private final DepartmentRepository repo;

    public List<DepartmentEntity> findAll() {
        return repo.findAll();
    }

    public Optional<DepartmentEntity> findById(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("Department id must not be null");
        }
        return repo.findById(id);
    }

    public DepartmentEntity save(DepartmentEntity dept) {
        if (dept == null) {
            throw new IllegalArgumentException("Department must not be null");
        }
        dept.setLastUpdate(LocalDateTime.now());
        return repo.save(dept);
    }

    public DepartmentEntity update(Integer id, DepartmentEntity dept) {
        if (dept == null) {
            throw new IllegalArgumentException("Department must not be null");
        }
        if (id == null) {
            throw new IllegalArgumentException("Department id must not be null");
        }
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Department not found with id=" + id);
        }
        dept.setId(id);
        dept.setLastUpdate(LocalDateTime.now());
        return repo.save(dept);
    }

    public void deleteById(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("Department id must not be null");
        }
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Department not found with id=" + id);
        }
        repo.deleteById(id);
    }
}
