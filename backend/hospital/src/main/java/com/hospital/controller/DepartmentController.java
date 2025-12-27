package com.hospital.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.DepartmentEntity;
import com.hospital.service.DepartmentService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService service;

    @GetMapping
    public List<DepartmentEntity> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentEntity> get(@PathVariable Integer id) {
        return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public DepartmentEntity create(@RequestBody DepartmentEntity dept) {
        return service.save(dept);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentEntity> update(
        @PathVariable Integer id,
        @RequestBody DepartmentEntity dept) {

        return ResponseEntity.ok(service.update(id, dept));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
