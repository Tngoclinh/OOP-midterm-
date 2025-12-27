package com.hospital.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.MedicalNewsEntity;
import com.hospital.service.MedicalNewsService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/medical-news")
public class MedicalNewsController {

    private final MedicalNewsService service;

    @GetMapping
    public List<MedicalNewsEntity> list() {
        return service.findAll(); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalNewsEntity> get(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    // @PostMapping
    // public MedicalNewsEntity create(@RequestBody MedicalNewsEntity news) {
    //     return service.save(news); 
    // }

    // @PutMapping
    // public ResponseEntity<MedicalNewsEntity> update(@PathVariable Integer id, @RequestBody MedicalNewsEntity news) {
    //     return ResponseEntity.ok(service.update(news));
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> delete(@PathVariable Integer id) {
    //     service.deleteById(id); 
    //     return ResponseEntity.noContent().build();
    // }
}