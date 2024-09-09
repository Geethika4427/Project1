package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.MyOrder;

public interface MyOrderRepo extends JpaRepository<MyOrder, Long> {

}
