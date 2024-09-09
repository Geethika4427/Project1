package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

}
