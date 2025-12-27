package com.hospital.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hospital.entity.PictureEntity;
import com.hospital.repository.PictureRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PictureService {

    private final PictureRepository repository;

    @Value("${app.upload-dir}")
    private String uploadDir;

    public PictureEntity uploadPicture(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("Vui lòng chọn một file để tải lên.");
            }
            String cleanPath = uploadDir.replace("file:", "");
            Path root = Paths.get(cleanPath);
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), root.resolve(fileName));

            PictureEntity picture = new PictureEntity();
            picture.setPictureUrl(fileName);
            return repository.save(picture);
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu file: " + e.getMessage(), e);
        }
    }

    public PictureEntity findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy ảnh với ID: " + id));
    }

    public PictureEntity findByUrl(String url) {
        return repository.findByPictureUrl(url)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy ảnh với URL: " + url));
    }
}