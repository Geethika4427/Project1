package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {

}
