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

import com.hospital.dto.DoctorDTO;
import com.hospital.entity.AppointmentEntity;
import com.hospital.entity.DoctorEntity;
import com.hospital.service.DoctorService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService service;

    // 1. Lấy danh sách bác sĩ cơ bản
    @GetMapping
    public List<DoctorEntity> list() {
        return service.findAll();
    }

    // 2. Lấy danh sách bác sĩ đầy đủ thông tin (Rating trung bình và tổng số review)
    @GetMapping("/with-rating")
    public List<DoctorDTO> listWithRating() {
        return service.findAllDoctorsWithRating();
    }

    // 3. Lấy chi tiết một bác sĩ theo ID
    @GetMapping("/{id}")
    public ResponseEntity<DoctorEntity> get(@PathVariable Integer id) {
        return service.findById(id) // Sử dụng findById(id) có kiểm tra null
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. Lấy danh sách các lịch hẹn chưa hoàn thành của bác sĩ ( chưa hoàn thành
    // nghĩa là status khác COMPLETED)
    @GetMapping("/non-completed-appointments/{id}")
    public ResponseEntity<List<AppointmentEntity>> getNonCompletedAppointments(@PathVariable Integer id) {
        List<AppointmentEntity> appointments = service.findNonCompletedAppointments(id);
        return ResponseEntity.ok(appointments);

    }

    // 5. Tạo mới bác sĩ
    @PostMapping
    public DoctorEntity create(@RequestBody DoctorEntity d) {
        return service.save(d); // Sử dụng save() có validate doctor null
    }

    // 6. Cập nhật thông tin bác sĩ
    @PutMapping("/{id}")
    public ResponseEntity<DoctorEntity> update(@PathVariable Integer id, @RequestBody DoctorEntity d) {
        return ResponseEntity.ok(service.update(id, d));
    }

    // 7. Xóa bác sĩ theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}