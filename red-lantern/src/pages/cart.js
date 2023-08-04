// Cart.js
import React from 'react';
import { useCartContext } from '../contexts/CartContext';

const Cart = () => {
    const { cartItems } = useCartContext();

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <p>Meal Name: {item.meal.name}</p>
                        <p>Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
