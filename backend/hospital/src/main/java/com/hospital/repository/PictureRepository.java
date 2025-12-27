package com.hospital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.entity.PictureEntity;

@Repository
public interface PictureRepository extends JpaRepository<PictureEntity, Integer> {
    Optional<PictureEntity> findByPictureUrl(String pictureUrl);
}