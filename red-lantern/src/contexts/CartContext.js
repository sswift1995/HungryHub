// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from 'aws-amplify';
import { Meal } from '../models';

const CART_STORAGE_KEY = 'cartItems'; // Define a key for localStorage

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addMealToCart = (meal, quantity) => {
        const newCartItem = { meal, quantity };
        setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
    };

    useEffect(() => {
        // Update localStorage whenever cartItems change
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addMealToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

export const useCartContext = () => useContext(CartContext);