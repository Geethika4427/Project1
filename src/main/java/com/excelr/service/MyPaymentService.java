package com.excelr.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.excelr.model.MyOrder;
import com.excelr.repo.MyOrderRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;


@Service
public class MyPaymentService {


	@Autowired
	private MyOrderRepo myRepo;
	
	@Value("${razorpay.key.id}")
	private String razorPayKey;
	
	@Value("${razorpay.secret.key}")
	private String razorPaySecret;
	
	private RazorpayClient client;
	
	
//	public MyOrder createOrder (MyOrder myOrder) throws Exception{
//		
//		JSONObject orderReq = new JSONObject();
//		orderReq.put("amount", myOrder.getAmount()*100);    // taken in Paisa 
//		orderReq.put("currency", "INR");
//		orderReq.put("receipt", myOrder.getEmail());
//		
//		this.client= new RazorpayClient(razorPayKey,razorPaySecret);
//		
//		
//		Order razorPayOrder= client.orders.create(orderReq);			// To create Order in RazorPay 
//	    
//		System.out.println(razorPayOrder);
//		
//		myOrder.setRazopayOrderId(razorPayOrder.get("id")); 				//to Know Order Id
//		myOrder.setOrderStatus(razorPayOrder.get("Status")); 				// To know Order Status
//		
//		myRepo.save(myOrder);
//		
//		return myOrder;
//	}
	
	
	public MyOrder createOrder(MyOrder myOrder) throws Exception {
	    try {
	        JSONObject orderReq = new JSONObject();
	        orderReq.put("amount", myOrder.getAmount()); // amount in paise
	        orderReq.put("currency", "INR");
	        orderReq.put("receipt", myOrder.getEmail());

	        this.client = new RazorpayClient(razorPayKey, razorPaySecret);

	        Order razorPayOrder = client.orders.create(orderReq); // To create Order in Razorpay
	        System.out.println(razorPayOrder);

	        myOrder.setRazopayOrderId(razorPayOrder.get("id")); // to know Order Id
	        myOrder.setOrderStatus(razorPayOrder.get("status")); // To know Order Status

	        myRepo.save(myOrder);

	        return myOrder;
	    } catch (Exception e) {
	        e.printStackTrace(); // Log the exception for debugging
	        throw new RuntimeException("Failed to create order", e);
	    }
	}

}
