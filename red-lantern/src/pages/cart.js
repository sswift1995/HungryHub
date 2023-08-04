import React from 'react';
import { useCartContext } from '../contexts/CartContext';

const Cart = () => {
    const { cartItems } = useCartContext();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h1>Order Summary</h1>

                    <ul className="list-group">
                        {cartItems.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <p>{item.quantity} {item.meal.name}</p>
                            </li>

                        ))}
                    </ul>
                    <button class="btn btn-outline-danger" style={{ fontSize: '20px', width: '180px', margin: '10px' }}>Add Items</button> <button class="btn btn-outline-danger" style={{ fontSize: '20px', width: '180px', margin: '10px' }}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;