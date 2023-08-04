import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Bounce } from 'react-activity';
import { DataStore } from "aws-amplify";
import { Restaurant, Meal } from "../models";

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [meals, setMeals] = useState([]);

    const navigation = useNavigate();

    const handleClick = () => {
        navigation(`/restaurants/${restaurant.id}/item`)
    }

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
        <div className="container" >

            <div className="row my-4" >
                <div className="col-md-12">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="img-fluid rounded"
                        style={{ width: '55%' }}
                    />
                </div>
                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <div className="mr-2">
                        <p className="name fw-bold mb-0" style={{ fontSize: '24px', color: '#333' }}>
                            {restaurant.name}
                        </p>
                        <p className="details text-muted fs-6 mb-0">
                            ${restaurant.deliveryFee.toFixed(2)} | {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} minutes
                        </p>
                    </div>
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }}>
                        <p className="fw-bold mb-0" style={{ fontSize: '18px', color: '#333' }}>
                            {restaurant.rating.toFixed(1)}
                        </p>
                    </div>
                </div>

            </div>



            <div className="col-md-8 mb-4">
                <div className='card border-0 h-100'>
                    {meals.map((meal) => (
                        <div className="card-body shadow d-flex align-items-center gap-3" key={meal.id} onClick={handleClick} style={{ cursor: 'pointer' }}>
                            <img
                                src={meal.image}
                                alt={meal.name}
                                className='rounded'
                                style={{ width: '100px', height: '100px' }}
                            />
                            <div className="flex-grow-1">
                                <h5 className="card-title fw-bold mb-0">{meal.name}</h5>
                                <p className="card-text fs-6 mb-3 text-muted">
                                    {meal.description}
                                </p>
                                <p className="card-text fs-5 fw-bold text-success">
                                    {meal.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default RestaurantDetails;