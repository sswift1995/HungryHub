import React, { useEffect, useState } from 'react';
import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart } = useCartContext();
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0)
    const [restaurantName, setRestaurantName] = useState('');
    const navigation = useNavigate();

    // Add items to the cart
    const handleAddItems = () => {
        if (cartItems.length > 0) {
            const restaurantId = cartItems[0].meal.restaurantID;
            navigation(`/restaurants/${restaurantId}`);
        } else {
            navigation('/');
        }
    };

    const handlePlaceOrder = () => {
        if (cartItems.length > 0) {
            localStorage.removeItem('orderDelivered');

            const orderDetails = {
                cartItems,
                orderPrice,
                restaurantName,
                minDeliveryTime: cartItems[0].restaurant.minDeliveryTime,
                maxDeliveryTime: cartItems[0].restaurant.maxDeliveryTime,
                deliveryFee: cartItems[0].restaurant.deliveryFee,
                totalPrice,
            };

            console.log(orderDetails)

            // Use the navigate function with the state object
            navigation('/order-details', { state: orderDetails });
        }
    };

    // totalPrice is the total of the items, orderPrice is totalPrice + deliveryFee
    useEffect(() => {
        // Calculate total price
        const newTotalPrice = cartItems.reduce((total, item) => total + item.meal.price * item.quantity, 0);
        setTotalPrice(newTotalPrice);

        // Calculate order price
        if (cartItems.length > 0) {
            const deliveryFee = cartItems[0].restaurant.deliveryFee;
            setOrderPrice(newTotalPrice + deliveryFee);

            // Set the restaurant name
            setRestaurantName(cartItems[0].restaurant.name);
        } else {
            setOrderPrice(0);
            setRestaurantName('');
        }
    }, [cartItems]);

    return (
        <div className="container">
            <div className="row" >
                <div className="col-md-4" >
                    <br></br>
                    <h2>Order Summary</h2>
                    <br></br>
                    {/* Restaurant Name */}
                    {restaurantName && <b><h5><u>{restaurantName}</u></h5></b>}

                    <br></br>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty. Add items to start a cart. </p>
                    ) : (
                        <ul className="list-group">
                            {cartItems.map((item, index) => (
                                <li key={index} className="border-bottom my-4 d-flex justify-content-between align-items-center">
                                    <p><b>{item.quantity} {item.meal.name}</b> ${item.meal.price}</p>
                                    <button
                                        className="btn btn"
                                        onClick={() => removeFromCart(index)}
                                    >
                                        🗑️
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <br></br>
                    {/* Total Items */}
                    <p>Subtotal: ${totalPrice.toFixed(2)}</p>

                    {/* Delivery Fee */}
                    {cartItems.length > 0 && (
                        <p>Delivery Fee: ${cartItems[0].restaurant.deliveryFee.toFixed(2)}</p>
                    )}

                    {/* Delivery Time */}
                    {cartItems.length > 0 && (
                        <p>Est. Delivery: {cartItems[0].restaurant.minDeliveryTime} - {cartItems[0].restaurant.maxDeliveryTime} minutes</p>
                    )}

                    {/* Order Price */}
                    <b><p><u>Order Total: ${orderPrice.toFixed(2)}</u></p></b>

                    {/* If there isn't anything in our cart, -> restaurant, else -> HomeScreen */}
                    <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: '20px', width: '150px', margin: '10px' }}
                        onClick={handleAddItems}
                    >
                        Add Items
                    </button>

                    {/* TODO: Place order button that goes to OrderDetails (?) page for delivery */}
                    <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: '20px', width: '150px', margin: '10px' }}
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
            <br />
        </div>

    );
};

export default Cart;
