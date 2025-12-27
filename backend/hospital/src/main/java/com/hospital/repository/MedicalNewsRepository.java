package com.hospital.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.entity.MedicalNewsEntity;

@Repository
public interface MedicalNewsRepository extends JpaRepository<MedicalNewsEntity, Integer> {
    List<MedicalNewsEntity> findAllByOrderByLastUpdateDesc();
}
