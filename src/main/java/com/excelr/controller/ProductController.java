package com.excelr.controller;

import com.excelr.model.Category;
import com.excelr.model.Product;
import com.excelr.service.CategoryService;
import com.excelr.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Autowired
    private CategoryService categoryService; // Add CategoryService to fetch categories

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("category") Long categoryId,
                                                 @RequestParam("old_price") Double oldPrice,
                                                 @RequestParam("new_price") Double newPrice,
                                                 @RequestParam("stockQuantity") int stockQuantity,
                                                 @RequestParam("file") MultipartFile file) {
        Optional<Category> categoryOpt = categoryService.getCategoryById(categoryId);
        if (!categoryOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Category category = categoryOpt.get();

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setCategory(category);
        product.setOld_price(oldPrice);
        product.setNew_price(newPrice);
        product.setStockQuantity(stockQuantity);

        try {
            Product savedProduct = productService.saveProduct(product, file);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("category") Long categoryId,
                                                 @RequestParam("old_price") Double oldPrice,
                                                 @RequestParam("new_price") Double newPrice,
                                                 @RequestParam("stockQuantity") int stockQuantity,
                                                 @RequestParam("file") MultipartFile file) {
        Optional<Product> existingProduct = productService.getProductById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();

            Optional<Category> categoryOpt = categoryService.getCategoryById(categoryId);
            if (!categoryOpt.isPresent()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Category category = categoryOpt.get();

            product.setName(name);
            product.setDescription(description);
            product.setCategory(category);
            product.setOld_price(oldPrice);
            product.setNew_price(newPrice);
            product.setStockQuantity(stockQuantity);

            try {
                Product updatedProduct = productService.updateProduct(product, file);
                return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long id) {
        Optional<Product> product = productService.getProductById(id);
        
        if (product.isPresent()) {
            productService.deleteProduct(id);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }

}
