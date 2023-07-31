import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Bounce } from 'react-activity';
import { DataStore } from "aws-amplify";
import { Restaurant, Meal } from "../models";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurantData = await DataStore.query(Restaurant, id);
                setRestaurant(restaurantData);

                const mealData = await DataStore.query(Meal, (meal) => meal.restaurantID.eq(id));
                setMeals(mealData);
            } catch (error) {
                console.log('Error fetching restaurant data: ', error);
            }
        };


        fetchRestaurant();
    }, [id]);

    if (!restaurant) {
        return <Bounce color="#727981" size={32} speed={1} animating={true} />;
    }

    console.log(restaurant)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <img style={{ width: '100%', aspectRatio: 5 / 3, marginBottom: 5, margin: 5, padding: 10 }} src={restaurant.image} alt={restaurant.name} />

            <div style={{ background: 'white', padding: 20, position: 'absolute', top: 90, left: 20, borderRadius: 50 }}>
                {/* Put an left arrow icon */}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p className='name' style={{ fontWeight: 900 }}>{restaurant.name}</p>
                    <p className='details' style={{ color: 'grey', fontSize: 12 }}>${restaurant.deliveryFee.toFixed(2)} &nbsp;&nbsp; {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} minutes</p>
                </div>

                <div style={{ backgroundColor: 'lightgrey', borderRadius: 10, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>{restaurant.rating.toFixed(1)}</p>
                </div>
            </div>
            <div>
                {meals.map((meal) => (
                    <div>
                        <p key={meal.id}>{meal.name}</p>
                        <img key={meal.id} src={meal.image} alt={meal.name} />
                        <p key={meal.id}>{meal.description}</p>
                        <p key={meal.id}>{meal.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantDetails;