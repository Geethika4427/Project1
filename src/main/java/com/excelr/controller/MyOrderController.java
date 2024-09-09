package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.excelr.service.MyPaymentService;

@Controller
@RequestMapping("/api")
public class MyOrderController<studentOrder> {

	@Autowired
	private MyPaymentService service;

	@GetMapping("/")
	public String init() {
		return "index";
	}

	@PostMapping(value = "/create-order", produces = "application/json")
	@ResponseBody
	public ResponseEntity<com.excelr.model.MyOrder> createOrder(@RequestBody com.excelr.model.MyOrder myOrder) throws Exception {
		com.excelr.model.MyOrder createdOrder = service.createOrder(myOrder);
		return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);

	}

}
