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

import com.hospital.entity.DoctorDaySlot;
import com.hospital.service.DoctorDaySlotService;

@RestController
@CrossOrigin
@RequestMapping("/api/slots")
public class DoctorDaySlotController {

    private final DoctorDaySlotService service;

    public DoctorDaySlotController(DoctorDaySlotService service) {
        this.service = service;
    }

    @GetMapping
    public List<DoctorDaySlot> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDaySlot> get(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public DoctorDaySlot create(@RequestBody DoctorDaySlot s) {
        return service.save(s);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorDaySlot> update(@PathVariable Long id, @RequestBody DoctorDaySlot s) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service.update(id, s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
