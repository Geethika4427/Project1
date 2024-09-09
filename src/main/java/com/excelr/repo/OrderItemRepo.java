package com.excelr.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.excelr.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {

//    @Query("SELECT o.id AS orderId, u.username AS customerName, p.name AS productName, oi.quantity AS quantity, o.totalAmount AS totalPrice " +
//           "FROM OrderItem oi " +
//           "JOIN oi.order o " +
//           "JOIN o.user u " +
//           "JOIN oi.product p")
//    List<Object[]> fetchOrderDetails();
	
	@Query("SELECT o.id AS orderId, u.username AS customerName, p.name AS productName, oi.quantity AS quantity, o.totalAmount AS totalPrice, o.status AS status " +
		       "FROM OrderItem oi " +
		       "JOIN oi.order o " +
		       "JOIN o.user u " +
		       "JOIN oi.product p")
		List<Object[]> fetchOrderDetails();

}
