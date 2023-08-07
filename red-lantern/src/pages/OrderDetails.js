import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderDetails = ({ cartItemsCount }) => {
    const location = useLocation();
    const navigation = useNavigate();
    const orderDetails = location.state; // Access the state object from location

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

    // Calculate the order subtotal and total
    const subtotal = orderDetails.cartItems.reduce(
        (total, item) => total + item.meal.price * item.quantity,
        0
    );

    const orderPrice = subtotal + orderDetails.deliveryFee;

    console.log('cartItems:', orderDetails.cartItems); // Check if cartItems are being passed correctly
    console.log('orderDetails:', orderDetails); // Check the orderDetails received from the previous page

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <br />
                    <h2>Your food is on the way!</h2>
                    <br />
                    <h4>Receipt</h4>
                    <br />
                    {/* Restaurant Name */}
                    {orderDetails.cartItems[0]?.restaurant?.name && (
                        <b>
                            <h5>
                                <u>{orderDetails.cartItems[0].restaurant.name}</u>
                            </h5>
                        </b>
                    )}
                    <br />
                    {orderDetails.cartItems.length === 0 ? (
                        <p>Your cart is empty. Add items to start a cart. </p>
                    ) : (
                        <ul className="list-group">
                            {orderDetails.cartItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="border-bottom my-4 d-flex justify-content-between align-items-center"
                                >
                                    <p>
                                        <b>
                                            {item.quantity} {item.meal.name}
                                        </b>{" "}
                                        ${item.meal.price}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                    <br />
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Delivery Fee: ${orderDetails.deliveryFee.toFixed(2)}</p>
                    <b>
                        <p>
                            <u>Order Total: ${orderPrice.toFixed(2)}</u>
                        </p>
                    </b>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;