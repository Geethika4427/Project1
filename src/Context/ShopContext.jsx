

import { createContext, useState, useEffect } from "react";
import all_product from '../Components/Assets/all_product';
import CartItems from "../Components/CartItems/CartItems";
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [cartId, setCartId] = useState(null); // Add cartId state

    useEffect(() => {
        console.log("Cart Items Updated:", cartItems);
    }, [cartItems]);

    // Simulate creating a cart ID on initial render or user login
    useEffect(() => {
        const existingCartId = localStorage.getItem('cartId');
        if (existingCartId) {
            setCartId(existingCartId);
        } else {
            const newCartId = `cart-${Math.random().toString(36).substr(2, 9)}`; // Simple cart ID generator
            localStorage.setItem('cartId', newCartId);
            setCartId(newCartId);
        }
    }, []);

    const addToCart = async (productId, quantity) => {
        const token = localStorage.getItem('authToken');
        const cartId = 1; // Ensure cartId is correctly set
    
        try {
            const response = await axios.post(
                'http://localhost:8080/api/cart-items',
                {
                    product: { id: Number(productId) }, // Convert to number
                    quantity:1, // Ensure quantity is a number
                    cart: { id: Number(cartId) } // Convert to number
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Item added to cart:', response.data);
        } catch (error) {
            console.error('Error adding item to cart:', error.response?.data || error.message);
        }
    };
   
    // const addToCart = async (productId, quantity, cartId) => {
    //     const token = localStorage.getItem('authToken');
    
    //     try {
    //         const response = await axios.post(
    //             'http://localhost:8080/api/cart-items',
    //             {
    //                 product: { id: Number(productId) }, // Convert to number
    //                 quantity: 1, // Ensure quantity is a number
    //                 cart: { id: Number(cartId) } // Convert to number
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         console.log('Item added to cart:', response.data);
    //     } catch (error) {
    //         console.error('Error adding item to cart:', error.response?.data || error.message);
    //     }
    // };
    
   
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:8080/api/cart-items/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = async () => {
        const token = localStorage.getItem('authToken');
        console.log('Token in cart page:', token); // Check the token value
    
        try {
            const response = await axios.get('http://localhost:8080/api/cart-items/count', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log('Response data:', response.data); // Check the response data
            return response.data.count || 0; // Default to 0 if count is not present
        } catch (error) {
            console.error('Error fetching total cart items:', error);
            return 0; // Default value in case of error
        }
    };
    

    // Add cartId to contextValue
    const contextValue = { cartId, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;


