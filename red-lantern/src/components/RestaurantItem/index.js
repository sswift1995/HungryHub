import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantItem = ({ restaurant }) => {
    const navigation = useNavigate();

    const handleClick = () => {
        navigation(`/restaurants/${restaurant.id}`)
    }

    return (
        <div onClick={handleClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <img style={{ width: '100%', aspectRatio: 5 / 3, marginBottom: 5, margin: 5, padding: 10 }} src={restaurant.image} alt={restaurant.name} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p className='name' style={{ fontWeight: 900 }}>{restaurant.name}</p>
                        <p className='details' style={{ color: 'grey', fontSize: 12 }}>${restaurant.deliveryFee.toFixed(2)} &nbsp;&nbsp; {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} minutes</p>
                    </div>

                    <div style={{ backgroundColor: 'lightgrey', borderRadius: 10, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p>{restaurant.rating.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantItem;