import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart } = useCartContext();
    const navigation = useNavigate();

    const handleAddItems = () => {
        // Assuming the first item in cartItems contains the restaurant information
        if (cartItems.length > 0) {
            const restaurantId = cartItems[0].meal.restaurantID;
            navigation(`/restaurants/${restaurantId}`);
        } else {
            navigation('/')
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h1>Order Summary</h1>

                    <ul className="list-group">
                        {cartItems.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{item.quantity} {item.meal.name}</p>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: '20px', width: '180px', margin: '10px' }}
                        onClick={handleAddItems}
                    >
                        Add Items
                    </button>
                    <button className="btn btn-outline-danger" style={{ fontSize: '20px', width: '180px', margin: '10px' }}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;