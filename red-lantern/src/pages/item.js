import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Meal, Restaurant } from '../models';
import { useCartContext } from '../contexts/CartContext';
import { Bounce } from 'react-activity';

export default function Item({ cartItemsCount, setCartItemsCount, restaurantId }) {
    const { mealId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [meal, setMeal] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    const { addMealToCart } = useCartContext();

    const navigate = useNavigate();


    useEffect(() => {
        const fetchMealAndRestaurant = async () => {
            try {
                // Fetch the item
                const mealData = await DataStore.query(Meal, mealId);
                if (mealData) {
                    setMeal(mealData);
                    if (restaurantId) {
                        // If restaurantId is already available as a prop, use it directly
                        const restaurantData = await DataStore.query(Restaurant, restaurantId);
                        setRestaurant(restaurantData);
                    } else if (mealData.restaurantID) {
                        // Otherwise, if mealData contains restaurantID, fetch the restaurant data using it
                        const restaurantData = await DataStore.query(Restaurant, mealData.restaurantID);
                        setRestaurant(restaurantData);
                    }
                }
            } catch (error) {
                console.log('Error fetching meal or restaurant data: ', error);
            }
        };

        fetchMealAndRestaurant();
    }, [mealId, restaurantId]);

    // Multiply the item's price by the quantity ordered
    useEffect(() => {
        if (meal) {
            setPrice(meal.price * quantity);
        }
    }, [meal, quantity]);

    // Plus button logic
    const handlePlusClick = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Minus button logic
    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const addToCart = () => {
        // If a meal is added to the cart
        if (meal) {
            const restaurantID = restaurant.id;
            const restaurantName = restaurant.name;

            // We pass the restaurant attributes to the cart
            addMealToCart(mealId, quantity, restaurantID, restaurantName);

            setCartItemsCount((prevCount) => prevCount + quantity);
            navigate(`/restaurants/${restaurantID}`);
        }
    };

    // Loading screen animation
    if (!meal) {
        return <Bounce color="#727981" size={32} speed={1} animating={true} />;
    }

    // Calculate the price of the items added, or display $0.00
    const calculatePrice = () => {
        return meal ? meal.price * quantity : '$0.00';
    };

    return (
        <div className="col-md-12 mb-4">
            <div className="card border-0 h-100">
                <div className="card-body shadow d-flex align-items-center gap-3" key={meal.id} style={{ cursor: 'pointer' }}>
                    <img
                        src={meal.image}
                        alt={meal.name}
                        className="rounded"
                        style={{ width: '100px', height: '100px' }}
                    />
                    <div className="flex-grow-1">
                        <h5 className="card-title fw-bold mb-0">{meal.name}</h5>
                        <p className="card-text fs-6 mb-3 text-muted">{meal.description}</p>
                        <p className="card-text fs-5 fw-bold text-success">{meal.price}</p>
                    </div>
                </div>

                <p className="h5">Qty {quantity}</p>
                <button onClick={handlePlusClick} className="btn btn-outline-danger" style={{ fontSize: '20px', width: '150px', marginTop: '10px' }}>+</button>
                <button onClick={handleMinusClick} className="btn btn-outline-danger" style={{ fontSize: '20px', width: '150px', marginTop: "10px" }}>-</button>
                <button onClick={() => addToCart()} className="btn btn-outline-danger" style={{ fontSize: '20px', width: '150px', marginTop: "10px" }}> ${calculatePrice().toFixed(2)} <br></br>Add to Cart</button> {/* Call the function */}

            </div>
        </div>
    );
}