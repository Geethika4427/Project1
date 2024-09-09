package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.excelr.model.CartItem;
import com.excelr.service.CartItemService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    //@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        List<CartItem> cartItems = cartItemService.getAllCartItems();
        return ResponseEntity.ok(cartItems);
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
        Optional<CartItem> cartItem = cartItemService.getCartItemById(id);
        return cartItem.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
    @PostMapping
    public ResponseEntity<CartItem> createCartItem(@RequestBody CartItem cartItem) {
        System.out.println("Received CartItem: " + cartItem); // Add this line
        try {
            CartItem createdCartItem = cartItemService.saveCartItem(cartItem);
            return ResponseEntity.ok(createdCartItem);
        } catch (IllegalArgumentException e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, @RequestBody CartItem cartItem) {
        if (!cartItemService.getCartItemById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        cartItem.setId(id);
        CartItem updatedCartItem = cartItemService.updateCartItem(cartItem);
        return ResponseEntity.ok(updatedCartItem);
    }

    
    
    @DeleteMapping("/{id}")
   // @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        if (!cartItemService.getCartItemById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
    
 // New endpoint to get total count of cart items
    @CrossOrigin(origins = "http://localhost:5174")
    @GetMapping("/count")
    public ResponseEntity<Integer> getTotalCartItemsCount() {
        int count = cartItemService.getTotalCartItemsCount();
        return ResponseEntity.ok(count);
    }
}
