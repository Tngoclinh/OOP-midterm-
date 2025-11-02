package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.entity.Department;
import com.hospital.repository.DepartmentRepository;

@Service
public class DepartmentService{

    private final DepartmentRepository repo;

    public DepartmentService(DepartmentRepository repo) {
        this.repo = repo;
    }

    public List<Department> findAll() {
        return repo.findAll();
    }

    public Optional<Department> findById(Integer id) {
        return repo.findById(id);
    }

    public Department save(Department dept) {
        return repo.save(dept);
    }

    public Department update(Integer id, Department dept) {
        dept.setId(id);
        return repo.save(dept);
    }

    public void deleteById(Integer id) {
        repo.deleteById(id);
    }
}
