package com.excelr.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="My_Order")
public class MyOrder {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer OrderId;
	
	private String name;
	private String email;
	private String phno;
	private String ads;
	private String item;
	private Integer amount;
	private String orderStatus;
	private String razopayOrderId;
	public Integer getOrderId() {
		return OrderId;
	}
	public void setOrderId(Integer orderId) {
		OrderId = orderId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhno() {
		return phno;
	}
	public void setPhno(String phno) {
		this.phno = phno;
	}
	public String getItem() {
		return item;
	}
	public String getAds() {
		return ads;
	}
	public void setAds(String ads) {
		this.ads = ads;
	}
	
	public void setItem(String item) {
		this.item = item;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public String getRazopayOrderId() {
		return razopayOrderId;
	}
	public void setRazopayOrderId(String razopayOrderId) {
		this.razopayOrderId = razopayOrderId;
	}
	@Override
	public String toString() {
		return "MyOrder [OrderId=" + OrderId + ", name=" + name + ", email=" + email + ", phno=" + phno + ", item="
				+ item + ", amount=" + amount + ", orderStatus=" + orderStatus + ", razopayOrderId=" + razopayOrderId
				+ "]";
	}

}
