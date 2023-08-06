import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';

const OrderDetails = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const { cartItems } = useCartContext();
    const orderDetails = location.state; // Access the state object from location

    // Calculate the subtotal based on the items in orderDetails.cartItems
    const subtotal = orderDetails.cartItems.reduce(
        (total, item) => total + item.meal.price * item.quantity,
        0
    );

    const orderPrice = subtotal + orderDetails.deliveryFee;

    const [orderDelivered, setOrderDelivered] = useState(false);

    useEffect(() => {
        const deliveryTime = 5000; // 5 seconds delivery time

        const timer = setTimeout(() => {
            // Set the order as delivered after the specified delivery time
            setOrderDelivered(true);
        }, deliveryTime);

        // Clean up the timer on component unmount
        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        // Navigate to '/delivered' when order is delivered
        if (orderDelivered) {
            navigation('/delivered');
        }
    }, [orderDelivered, navigation]);

    // Check if orderDetails exists and has cartItems before proceeding
    if (!orderDetails || !orderDetails.cartItems || orderDetails.cartItems.length === 0) {
        return <p>No order details found. Please go back to the cart and place an order.</p>;
    }

    return (
        <div>
            <h2>Order Details</h2>
            {cartItems[0]?.restaurant?.name && <h1>{cartItems[0].restaurant.name}</h1>}
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <p>{item.meal.name}, ${item.meal.price}</p>
                    </li>
                ))}
            </ul>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Delivery Fee: ${orderDetails.deliveryFee}</p>
            <p>Total: <b>${orderPrice.toFixed(2)}</b></p>
            <br />
            <br />
            <h2>Your food is on the way!</h2>
        </div>
    );
};

export default OrderDetails;