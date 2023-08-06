import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDelivered = () => {
    const navigation = useNavigate();

    const goBack = () => {
        navigation('/')
    }

    return (
        <div>
            <h2>Your order has been delivered!</h2>
            <p>Enjoy your food!</p>
            <button onClick={goBack}>Close</button>
        </div>
    );
};

export default OrderDelivered;