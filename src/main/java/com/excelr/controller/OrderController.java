package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.excelr.model.Order;
import com.excelr.model.Product;
import com.excelr.service.OrderService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/order-details")
    public List<Object[]> getOrderDetails() {
        return orderService.fetchOrderDetails();
    }
    
    @GetMapping
    //@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    

    @GetMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
//  
//    @PostMapping
//   // @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public Order createOrder(@RequestBody Order order) {
//    	System.out.println("Received Order: " + order);
//        return orderService.saveOrder(order);
//    }
    
//    @PostMapping
//    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
//        // Check if the User and Address are provided
//        if (order.getUser() == null || order.getUser().getId() == null) {
//            throw new IllegalArgumentException("User must be provided");
//        }
//        if (order.getShippingAddress() == null || order.getShippingAddress().getId() == null) {
//            throw new IllegalArgumentException("Address must be provided");
//        }
//
//        Order savedOrder = orderService.saveOrder(order);
//        return ResponseEntity.ok(savedOrder);
//    }

//    @PostMapping
//    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
//        // Debug logs to check received data
//        System.out.println("Received Order: " + order);
//        System.out.println("Order User: " + (order.getUser() != null ? order.getUser().getId() : "User is null"));
//        System.out.println("Shipping Address: " + (order.getShippingAddress() != null ? order.getShippingAddress().getId() : "Address is null"));
//
//        if (order.getUser() == null || order.getUser().getId() == null) {
//            throw new IllegalArgumentException("User must be provided");
//        }
//        if (order.getShippingAddress() == null || order.getShippingAddress().getId() == null) {
//            throw new IllegalArgumentException("Address must be provided");
//        }
//
//        Order savedOrder = orderService.saveOrder(order);
//        return ResponseEntity.ok(savedOrder);
//    }
//
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // Debug logs to check received data
        System.out.println("Received Order: " + order);
        System.out.println("Order User: " + (order.getUser() != null ? order.getUser().getId() : "User is null"));
        System.out.println("Shipping Address: " + (order.getShippingAddress() != null ? order.getShippingAddress().getId() : "Address is null"));
        System.out.println("Products: " + (order.getProducts() != null ? order.getProducts().stream().map(Product::getId).collect(Collectors.toList()) : "Products are null"));

        if (order.getUser() == null || order.getUser().getId() == null) {
            throw new IllegalArgumentException("User must be provided");
        }
        if (order.getShippingAddress() == null || order.getShippingAddress().getId() == null) {
            throw new IllegalArgumentException("Address must be provided");
        }
        if (order.getProducts() == null || order.getProducts().isEmpty()) {
            throw new IllegalArgumentException("At least one product must be provided");
        }

        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }
    
    @PutMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        if (orderService.getOrderById(id) != null) {
            order.setId(id);
            return ResponseEntity.ok(orderService.saveOrder(order));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   
    @DeleteMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderService.getOrderById(id) != null) {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
