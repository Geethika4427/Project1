package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.Category;

public interface CategoryRepo extends JpaRepository<Category, Long> {

}
