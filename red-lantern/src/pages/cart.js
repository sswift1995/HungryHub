import React, { useEffect, useState } from 'react';
import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTotalPriceContext } from '../contexts/TotalPriceContext';

const Cart = () => {
    const { cartItems, removeFromCart, resetCartItems } = useCartContext();
    const { totalPrice, resetTotalPrice } = useTotalPriceContext();
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

            // Reset the totalPrice to 0 when the order has been placed
            resetTotalPrice();

            // Use the navigate function with the state object
            navigation('/order-details', { state: orderDetails });

            resetCartItems();
        }
    };

    // totalPrice is the total of the items, orderPrice is totalPrice + deliveryFee
    useEffect(() => {
        // Calculate total price
        const newTotalPrice = cartItems.reduce((total, item) => total + item.meal.price * item.quantity, 0);
        setOrderPrice(newTotalPrice);

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
    }, [cartItems, totalPrice]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h1>Order Summary</h1>

                    {restaurantName && <b><p>{restaurantName}</p></b>}

                    <ul className="list-group">
                        {cartItems.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <p><b>{item.quantity} {item.meal.name}</b> ${item.meal.price}</p>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Total Items */}
                    <b><p>${orderPrice.toFixed(2)}</p></b>

                    {/* Delivery Fee */}
                    {cartItems.length > 0 && (
                        <p>Delivery Fee: ${cartItems[0].restaurant.deliveryFee}</p>
                    )}

                    {/* Delivery Time */}
                    {cartItems.length > 0 && (
                        <p>{cartItems[0].restaurant.minDeliveryTime} - {cartItems[0].restaurant.maxDeliveryTime} minutes</p>
                    )}

                    {/* Order Price */}
                    <p>Total: <b>${orderPrice.toFixed(2)}</b></p>

                    {/* If there isn't anything in our cart, -> restaurant, else -> HomeScreen */}
                    <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: '20px', width: '180px', margin: '10px' }}
                        onClick={handleAddItems}
                    >
                        Add Items
                    </button>

                    {/* TODO: Place order button that goes to OrderDetails (?) page for delivery */}
                    <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: '20px', width: '180px', margin: '10px' }}
                        onClick={handlePlaceOrder}
                    >
                        Place Order (${orderPrice.toFixed(2)})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;