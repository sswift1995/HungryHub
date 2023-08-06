import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';

const OrderDetails = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const { cartItems } = useCartContext();
    const orderDetails = location.state; // Access the state object from location

    const [orderDelivered, setOrderDelivered] = useState(false);

    const orderPrice = orderDetails.totalPrice + orderDetails.deliveryFee;

    useEffect(() => {
        // Check if the order is delivered
        const isDelivered = localStorage.getItem('orderDelivered') === 'true';

        if (!isDelivered) {
            const deliveryTime = 5000; // 5 seconds delivery time
            const timer = setTimeout(() => {
                // Set the order as delivered
                setOrderDelivered(true);
                // Save the delivery status in localStorage
                localStorage.setItem('orderDelivered', 'true');
            }, deliveryTime);

            // Clean up the timer on component unmount
            return () => {
                clearTimeout(timer);
                // Make sure to reset the 'orderDelivered' status in localStorage when unmounting
                localStorage.removeItem('orderDelivered');
            };
        }
    }, []);

    // Check if orderDetails exists and has cartItems before proceeding
    if (!orderDetails || !orderDetails.cartItems || orderDetails.cartItems.length === 0) {
        return <p>No order details found. Please go back to the cart and place an order.</p>;
    }

    if (orderDelivered) {
        navigation('/delivered');
        return null;
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
                    <p>Subtotal: ${orderDetails.totalPrice.toFixed(2)}</p>
                    <p>Delivery Fee: ${orderDetails.deliveryFee.toFixed(2)}</p>
                    <b><p><u>Order Total: ${orderPrice.toFixed(2)}</u></p></b>
                    <br />
                    
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
