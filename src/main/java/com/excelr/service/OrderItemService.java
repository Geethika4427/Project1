package com.excelr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.OrderItem;
import com.excelr.repo.OrderItemRepo;

@Service
public class OrderItemService {
	 @Autowired
	    private OrderItemRepo orderItemRepository;

	    public OrderItem saveOrderItem(OrderItem orderItem) {
	        return orderItemRepository.save(orderItem);
	    }

	    public List<OrderItem> getAllOrderItems() {
	        return orderItemRepository.findAll();
	    }

	    public Optional<OrderItem> getOrderItemById(Long id) {
	        return orderItemRepository.findById(id);
	    }

	    public void deleteOrderItem(Long id) {
	        orderItemRepository.deleteById(id);
	    }
}
