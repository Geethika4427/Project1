package com.excelr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Cart;
import com.excelr.model.CartItem;
import com.excelr.model.Product;
import com.excelr.repo.CartItemRepo;
import com.excelr.repo.CartRepo;
import com.excelr.repo.ProductRepo;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepo cartItemRepo;
    
    @Autowired
    private CartRepo cartRepository;
    
    @Autowired
    private ProductRepo productRepository;

    public List<CartItem> getAllCartItems() {
        return cartItemRepo.findAll();
    }

    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepo.findById(id);
    }

//    public CartItem saveCartItem(CartItem cartItem) {
//        return cartItemRepo.save(cartItem);
//    }
    
//    public CartItem saveCartItem(CartItem cartItem) {
//        if (cartItem.getCart() == null || cartItem.getCart().getId() == null) {
//            throw new IllegalArgumentException("Cart cannot be null");
//        }
//        Cart cart = cartRepository.findById(cartItem.getCart().getId())
//            .orElseThrow(() -> new RuntimeException("Cart not found"));
//        cartItem.setCart(cart);
//        return cartItemRepo.save(cartItem);
//    }
    
    
    public CartItem saveCartItem(CartItem cartItem) {
        if (cartItem.getCart() == null || cartItem.getCart().getId() == null) {
            throw new IllegalArgumentException("Cart cannot be null");
        }
        if (cartItem.getProduct() == null || cartItem.getProduct().getId() == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }

        Cart cart = cartRepository.findById(cartItem.getCart().getId())
            .orElseThrow(() -> new RuntimeException("Cart not found"));
        Product product = productRepository.findById(cartItem.getProduct().getId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        return cartItemRepo.save(cartItem);
    }


//    
//    public CartItem updateCartItem(CartItem cartItem) {
//        return cartItemRepo.save(cartItem);
//    }
    
    public CartItem updateCartItem(CartItem cartItem) {
        if (cartItem.getCart() == null || cartItem.getCart().getId() == null) {
            throw new IllegalArgumentException("Cart cannot be null");
        }
        if (cartItem.getProduct() == null || cartItem.getProduct().getId() == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }

        Cart cart = cartRepository.findById(cartItem.getCart().getId())
            .orElseThrow(() -> new RuntimeException("Cart not found"));
        Product product = productRepository.findById(cartItem.getProduct().getId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        return cartItemRepo.save(cartItem);
    }

    public void deleteCartItem(Long id) {
        cartItemRepo.deleteById(id);
    }
    
 // New method to get total count of cart items
    public int getTotalCartItemsCount() {
        return (int) cartItemRepo.count();
    }
}

