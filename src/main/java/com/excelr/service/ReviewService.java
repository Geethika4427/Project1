package com.excelr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Review;
import com.excelr.model.User;
import com.excelr.repo.ProductRepo;
import com.excelr.repo.ReviewRepo;
import com.excelr.repo.UserRepo;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;
    
    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private UserRepo userRepository;

    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepo.findById(id);
    }
    
    public Review saveReview(Review review) {
        // Ensure product and user are not null
        if (review.getProduct() == null || review.getUser() == null) {
            throw new IllegalArgumentException("Product and User cannot be null");
        }

        // Verify that the referenced product and user exist
        if (!productRepository.existsById(review.getProduct().getId())) {
            throw new EntityNotFoundException("Product not found");
        }
        if (!userRepository.existsById(review.getUser().getId())) {
            throw new EntityNotFoundException("User not found");
        }

        return reviewRepo.save(review);
    }
   
    public Review updateReview(Review review) {
        // Ensure product and user are not null
        if (review.getProduct() == null || review.getUser() == null) {
            throw new IllegalArgumentException("Product and User cannot be null");
        }

        // Verify that the referenced product and user exist
        if (!productRepository.existsById(review.getProduct().getId())) {
            throw new EntityNotFoundException("Product not found");
        }
        if (!userRepository.existsById(review.getUser().getId())) {
            throw new EntityNotFoundException("User not found");
        }

        return reviewRepo.save(review);
    }
    public void deleteReview(Long id) {
        reviewRepo.deleteById(id);
    }
}
