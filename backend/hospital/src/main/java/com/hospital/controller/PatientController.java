package com.hospital.controller;

import java.util.List;
import java.util.Map;

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
import com.hospital.entity.PatientEntity;
import com.hospital.service.PatientService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService service;

    // 1. Lấy danh sách tất cả bệnh nhân
    @GetMapping
    public List<PatientEntity> list() {
        return service.findAll();
    }

    // 2. Lấy thông tin chi tiết một bệnh nhân theo số định danh (identityNumber)
    @GetMapping("/{identityNumber}")
    public ResponseEntity<PatientEntity> get(@PathVariable Long identityNumber) {
        try {
            return ResponseEntity.ok(service.findById(identityNumber));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 3. Lấy lịch sử các cuộc hẹn/khám bệnh của bệnh nhân
    // Vận dụng hàm getAppointmentHistory đã viết trong Service
    @GetMapping("/appointments/{identityNumber}")
    public ResponseEntity<List<AppointmentEntity>> getHistory(@PathVariable Long identityNumber) {
        try {
            List<AppointmentEntity> history = service.getAppointmentHistory(identityNumber);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 4. Tạo mới hồ sơ bệnh nhân
    @PostMapping
    public PatientEntity create(@RequestBody PatientEntity p) {
        return service.save(p);
    }

    // 5. Cập nhật thông tin bệnh nhân
    @PutMapping("/{identityNumber}")
    public ResponseEntity<PatientEntity> update(@PathVariable Long identityNumber, @RequestBody PatientEntity p) {
        return ResponseEntity.ok(service.update(identityNumber,p));
    }

    // 6. Xóa hồ sơ bệnh nhân
    @DeleteMapping("/{identityNumber}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long identityNumber) {
        service.deleteById(identityNumber);
        return ResponseEntity.noContent().build();
    }
}