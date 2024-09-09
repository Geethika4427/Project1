package com.excelr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.excelr.model.Order;
import com.excelr.model.Product;
import com.excelr.model.User;
import com.excelr.model.Address;
import com.excelr.repo.OrderRepo;
import com.excelr.repo.ProductRepo;
import com.excelr.repo.UserRepo;
import com.excelr.repo.AddressRepo;
import com.excelr.repo.OrderItemRepo;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepository;

    @Autowired
    private AddressRepo addressRepository;

    @Autowired
    private UserRepo userRepository;
    
    @Autowired
    private ProductRepo productRepository;
    
    @Autowired
    private OrderItemRepo orderItemRepository;

    public List<Object[]> fetchOrderDetails() {
        return orderItemRepository.fetchOrderDetails();
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

//    public Order saveOrder(Order order) {
//        if (order.getUser() == null || order.getUser().getId() == null) {
//            throw new IllegalArgumentException("User must be provided");
//        }
//        if (order.getShippingAddress() == null || order.getShippingAddress().getId() == null) {
//            throw new IllegalArgumentException("Address must be provided");
//        }
//
//        // Load User and Address from the database
//        User user = userRepository.findById(order.getUser().getId())
//            .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));
//        Address address = addressRepository.findById(order.getShippingAddress().getId())
//            .orElseThrow(() -> new IllegalArgumentException("Invalid Address ID"));
//
//        order.setUser(user);
//        order.setShippingAddress(address);
//
//        return orderRepository.save(order);
//    }

    public Order saveOrder(Order order) {
        if (order.getUser() == null || order.getUser().getId() == null) {
            throw new IllegalArgumentException("User must be provided");
        }
        if (order.getShippingAddress() == null || order.getShippingAddress().getId() == null) {
            throw new IllegalArgumentException("Address must be provided");
        }

        // Load User and Address from the database
        User user = userRepository.findById(order.getUser().getId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));
        Address address = addressRepository.findById(order.getShippingAddress().getId())
            .orElseThrow(() -> new IllegalArgumentException("Invalid Address ID"));

        // Set user and address
        order.setUser(user);
        order.setShippingAddress(address);

        // Handle the association with products
        if (order.getProducts() != null && !order.getProducts().isEmpty()) {
            Set<Product> products = order.getProducts().stream()
                .map(product -> productRepository.findById(product.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Product ID: " + product.getId())))
                .collect(Collectors.toSet());
            order.setProducts(products);
        }

        return orderRepository.save(order);
    }

    
    public void deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Order not found");
        }
    }
}
