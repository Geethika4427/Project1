package com.excelr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"user", "order"})
public class Address {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private String street;

	    @Column(nullable = false)
	    private String city;
	    
	    @Column(nullable = false)
	    private String locality;

	    @Column(nullable = false)
	    private String state;

	    @Column(nullable = false)
	    private String postalCode;

	    @Column(nullable = false)
	    private String country;

	    @OneToOne(mappedBy = "address")
	    @EqualsAndHashCode.Exclude
	    //@JsonIgnore
	    @JsonBackReference(value = "user-address")
	    private User user;

	   // @JsonIgnore
	    @OneToOne(mappedBy = "shippingAddress")
	    @EqualsAndHashCode.Exclude
	    @JsonBackReference
	    private Order order;
}


