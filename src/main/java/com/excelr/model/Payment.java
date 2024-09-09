package com.excelr.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Payment {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    @Temporal(TemporalType.TIMESTAMP)
	    private Date paymentDate;

	    @Column(nullable = false)
	    private Double amount;

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private PaymentMethod paymentMethod;

	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private PaymentStatus status;

	    @OneToOne
	    @JoinColumn(name = "order_id", nullable = false)
	    @JsonProperty("orderId")
	    @JsonBackReference(value = "order-payment")
	    //@JsonIgnore
	    private Order order;
	    
	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    @JsonBackReference(value = "user-payments") // Matches the reference in User entity
	    private User user;
}
