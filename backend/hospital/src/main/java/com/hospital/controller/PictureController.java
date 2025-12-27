package com.hospital.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hospital.entity.PictureEntity;
import com.hospital.service.PictureService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pictures")
@RequiredArgsConstructor
@CrossOrigin
public class PictureController {

    private final PictureService service;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        PictureEntity savedPicture = service.uploadPicture(file);
        return ResponseEntity.ok(savedPicture);
    }

    // Lấy theo ID từ PathVariable
    @GetMapping("/find-by-id")
    public ResponseEntity<PictureEntity> findById(@RequestParam Integer id) {
        // Vì Service đã ném lỗi nếu không tìm thấy, nên GlobalExceptionHandler sẽ lo phần báo lỗi
        return ResponseEntity.ok(service.findById(id));
    }

    // Lấy theo URL (Dùng @RequestParam như bạn đã viết ở tham số hàm)
    // Ví dụ: /api/pictures/find-by-url?url=ten-anh.png
    @GetMapping("/find-by-url")
    public ResponseEntity<PictureEntity> findByUrl(@RequestParam String url) {
        return ResponseEntity.ok(service.findByUrl(url));
    }
}