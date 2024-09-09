package com.excelr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Payment;
import com.excelr.repo.PaymentRepo;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepo.findById(id);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepo.save(payment);
    }

    public Payment updatePayment(Payment payment) {
        return paymentRepo.save(payment);
    }

    public void deletePayment(Long id) {
        paymentRepo.deleteById(id);
    }
}
