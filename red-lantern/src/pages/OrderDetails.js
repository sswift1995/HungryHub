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
        <div className="container">
            <div className="row" >
                <div className="col-md-6" >
                    <br></br>
                    <h2>Your food is on the way!</h2>
                    <br />
                    <h4>Receipt</h4>
                    <br />
                    {cartItems[0]?.restaurant?.name && <b><h5><u>{cartItems[0].restaurant.name}</u></h5></b>}
                    <br></br>
                    <ul className="list-group">
                        {cartItems.map((item, index) => (
                            <li key={index} className="border-bottom my-4 d-flex justify-content-between align-items-center">
                                <p><b>{item.quantity} {item.meal.name}</b> ${item.meal.price}</p>
                            </li>
                        ))}
                    </ul>
                    <br></br>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Delivery Fee: ${orderDetails.deliveryFee.toFixed(2)}</p>
                    <b><p><u>Order Total: ${orderPrice.toFixed(2)}</u></p></b>
                    <br />
                    
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;