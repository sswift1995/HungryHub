import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDelivered = () => {
    const navigation = useNavigate();

    const goBack = () => {
        navigation('/')
    }

    return (
        <div className="container">
            <div className="row" >
                <div className="col-md-8" >
                    <br />
                    <h2>Your order has been delivered!</h2>
                    <br />
                    <p>Enjoy your food!</p>
                    <button className="btn btn-outline-danger"
                        style={{ fontSize: '20px', width: '120px', margin: '10px' }} onClick={goBack}>Close</button>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default OrderDelivered;