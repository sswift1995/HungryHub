// CartContext.js
import React, { createContext, useContext, useState } from "react";
import { DataStore } from 'aws-amplify';
import { Meal } from '../models';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addMealToCart = (meal, quantity) => {
        setCartItems((prevCartItems) => [...prevCartItems, { meal, quantity }]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addMealToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

export const useCartContext = () => useContext(CartContext);
