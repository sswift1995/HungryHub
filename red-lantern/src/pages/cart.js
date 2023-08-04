import React from 'react';
import { useCartContext } from '../contexts/CartContext';

const Cart = () => {
    const { cartItems } = useCartContext();
  
    const handleDeleteItem = (index) => {
    removeFromCart(index);
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
                <button className="btn btn-outline-secondary" onClick={() => handleDeleteItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <button className="btn btn-outline-danger" style={{ fontSize: '20px', width: '180px', margin: '10px' }}>Add Items</button>
          <button className="btn btn-outline-danger" style={{ fontSize: '20px', width: '180px', margin: '10px' }}>Place Order</button>
        </div>
    );
};

export default Cart;