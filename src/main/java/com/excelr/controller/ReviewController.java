package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.excelr.model.Review;
import com.excelr.service.ReviewService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Optional<Review> review = reviewService.getReviewById(id);
        return review.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

//    @PostMapping
//    public ResponseEntity<Review> createReview(@RequestBody Review review) {
//        Review createdReview = reviewService.saveReview(review);
//        return ResponseEntity.ok(createdReview);
//    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        // Log the incoming review
        System.out.println("Creating review: " + review);
        
        // Validate that all required fields are set
        if (review.getProduct() == null || review.getUser() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        
        Review createdReview = reviewService.saveReview(review);
        
        // Log the created review
        System.out.println("Created review: " + createdReview);
        
        return ResponseEntity.ok(createdReview);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review review) {
        if (!reviewService.getReviewById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        review.setId(id);
        Review updatedReview = reviewService.updateReview(review);
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        if (!reviewService.getReviewById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
