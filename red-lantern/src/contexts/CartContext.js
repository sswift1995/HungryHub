// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from 'aws-amplify';
import { Meal, Restaurant } from '../models';

const CART_STORAGE_KEY = 'cartItems'; // Define a key for localStorage

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    // Add an item to the cart
    const addMealToCart = async (mealId, quantity) => {
        try {
            // Fetch the item
            const meal = await DataStore.query(Meal, mealId);
            if (meal) {
                // Fetch the restaurant attached to the item
                const restaurant = await DataStore.query(Restaurant, meal.restaurantID);
                if (restaurant) {
                    // We add certain fields from Restaurant to display in our frontend
                    const newCartItem = {
                        meal,
                        quantity,
                        restaurant: {
                            ...restaurant,
                            deliveryFee: restaurant.deliveryFee,
                            minDeliveryTime: restaurant.minDeliveryTime,
                            maxDeliveryTime: restaurant.maxDeliveryTime,
                        }
                    };
                    // We add newCartItem to cartItem
                    setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
                }
            }
        } catch (error) {
            console.log('Error fetching meal data: ', error);
        }
    };

    // Update localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    // Remove item from the cart
    const removeFromCart = (index) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems.splice(index, 1);
            return updatedCartItems;
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addMealToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

export const useCartContext = () => useContext(CartContext);