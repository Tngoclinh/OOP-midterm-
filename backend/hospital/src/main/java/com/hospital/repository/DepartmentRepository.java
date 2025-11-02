package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.entity.Department;


public interface DepartmentRepository extends JpaRepository<Department, Integer>{
	
}