import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Meal } from '../models';
import { useCartContext } from '../contexts/CartContext';

export default function Item({ cartItemsCount, setCartItemsCount }) {
    const { id, mealId } = useParams();
    const [meal, setMeal] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    const { addMealToCart } = useCartContext();
    const navigate = useNavigate();
    const { setCartItems } = useCartContext();

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const mealData = await DataStore.query(Meal, mealId);
                setMeal(mealData);
            } catch (error) {
                console.log('Error fetching meal data: ', error);
            }
        };

        fetchMeal();
    }, [mealId]);

    useEffect(() => {
        if (meal) {
            setPrice(meal.price * quantity);
        }
    }, [meal, quantity]);

    const handlePlusClick = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const addToCart = () => {
        if (meal) {
            addMealToCart(meal, quantity);
            setCartItemsCount((prevCount) => prevCount + quantity);
            navigate(`/restaurants/${id}`);
        }
    };

    if (!meal) {
        return <p>Loading meal...</p>;
    }

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
                <button onClick={handlePlusClick}>+</button>
                <p>{quantity}</p>
                <button onClick={handleMinusClick}>-</button>
                <button onClick={() => addToCart()}>Order ${calculatePrice()}</button> {/* Call the function */}
            </div>
        </div>
    );
}