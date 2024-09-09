package com.excelr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Cart;
import com.excelr.model.CartItem;
import com.excelr.model.User;
import com.excelr.repo.CartRepo;
import com.excelr.repo.UserRepo;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;
    
    public List<Cart> getAllCarts() {
        return cartRepo.findAll();
    }

    public Cart getCartByUserId(Long userId) {
        return cartRepo.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Cart not found for user id: " + userId));
    }

    public Cart addItemToCart(Long userId, CartItem item) {
        // Find the cart by user ID or create one if it doesn't exist
        Cart cart = cartRepo.findByUserId(userId).orElseGet(() -> {
            User user = userRepo.findById(userId).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + userId));
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepo.save(newCart); // Save and return the newly created cart
        });

        // Add item to the cart
        cart.getItems().add(item);
        item.setCart(cart);

        return cartRepo.save(cart);
    }
    
    public Cart updateCartItem(Long userId, Long cartItemId, CartItem updatedItem) {
        // Use Optional<Cart> properly
        Cart cart = cartRepo.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Cart not found for user id: " + userId));
        
        CartItem existingItem = cart.getItemById(cartItemId);
        if (existingItem != null) {
            existingItem.setQuantity(updatedItem.getQuantity());
            existingItem.setProduct(updatedItem.getProduct()); 
            return cartRepo.save(cart);
        }
        return null; 
    }


    public Cart removeItemFromCart(Long userId, Long cartItemId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().removeIf(item -> item.getId().equals(cartItemId));

        return cartRepo.save(cart);
    }

    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();

        cartRepo.save(cart);
    }
}
