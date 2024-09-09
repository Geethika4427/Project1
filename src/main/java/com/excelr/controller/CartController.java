package com.excelr.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.excelr.model.Cart;
import com.excelr.model.CartItem;
import com.excelr.model.Product;
import com.excelr.service.CartService;
import com.excelr.service.ProductService;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
  //  @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{userId}")
  //  @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{userId}/items")
   // @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long userId, @RequestBody CartItem item) {
        Cart cart = cartService.addItemToCart(userId, item);
        return ResponseEntity.ok(cart);
    }

    
    @PutMapping("/{userId}/items/{cartItemId}")
   // @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long userId, 
                                                @PathVariable Long cartItemId, 
                                                @RequestBody CartItem updatedItem) {
        Cart cart = cartService.updateCartItem(userId, cartItemId, updatedItem);
        return ResponseEntity.ok(cart);
    }
    
    
    @DeleteMapping("/{userId}/items/{cartItemId}")
  //  @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long userId, @PathVariable Long cartItemId) {
        Cart cart = cartService.removeItemFromCart(userId, cartItemId);
        return ResponseEntity.ok(cart);
    }

    
    @DeleteMapping("/{userId}/clear")
   // @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
