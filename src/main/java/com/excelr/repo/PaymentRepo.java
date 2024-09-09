package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Long> {

}
