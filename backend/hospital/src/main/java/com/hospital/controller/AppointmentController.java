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

import com.hospital.entity.AppointmentEntity;
import com.hospital.service.AppointmentService;

import lombok.RequiredArgsConstructor;


@RestController
@CrossOrigin
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;

    @GetMapping
    public List<AppointmentEntity> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentEntity> get(@PathVariable Integer id) {
        return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public AppointmentEntity create(@RequestBody AppointmentEntity a) {
        return service.save(a);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentEntity> update(@PathVariable Integer id,@RequestBody AppointmentEntity a) {
        return ResponseEntity.ok(service.update(id,a));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
