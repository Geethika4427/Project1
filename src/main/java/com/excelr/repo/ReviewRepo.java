package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.Review;

public interface ReviewRepo extends JpaRepository<Review, Long> {

}
