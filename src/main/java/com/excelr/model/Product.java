package com.excelr.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashSet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(nullable = false)
    private String name;
	
	@Column
    private String image;
	
	@Column(nullable = false)
    private String description;
	
	@ManyToOne
	@JoinColumn(name="category_id", nullable = false)
    private Category category;
    
    @Column(nullable = false)
    private Double old_price;
    
    @Column(nullable = false)
    private Double new_price;
    
    @Column(nullable = false)
    private int stockQuantity;
    
//    @JsonIgnore
//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "order_products", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
//    private Set<Product> products = new HashSet<>();

    @ManyToMany(mappedBy = "products")
    //@JsonBackReference
    @JsonIgnore
    private Set<Order> orders = new HashSet<>();
    
    // Constructor with all fields
    public Product(Long id, String description, String image, String name,
                   Category category, Double newPrice, Double oldPrice, int stockQuantity) {
        this.id = id;
        this.description = description;
        this.image = image;
        this.name = name;
        this.category = category;
        this.new_price = newPrice;
        this.old_price = oldPrice;
        this.stockQuantity = stockQuantity;
    }
    
}
