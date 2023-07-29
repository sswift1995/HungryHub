//enter menu and details about the address

import React from "react";
import restaurants from '../../src/data/restaurants.json'

const restaurant = restaurants[0]

export default function RestaurantDetails() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <img style={{ width: '100%', aspectRatio: 5 / 3, marginBottom: 5, margin: 5, padding: 10 }} src={restaurant.image} alt={restaurant.name} />

            <div style={{ background: 'white', padding: 20, position: 'absolute', top: 90, left: 20, borderRadius: 50 }}>
                {/* Put an left arrow icon */}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p className='name' style={{ fontWeight: 900 }}>{restaurant.name}</p>
                    <p className='details' style={{ color: 'grey', fontSize: 12 }}>${restaurant.deliveryFee} &nbsp;&nbsp; {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} minutes</p>
                </div>

                <div style={{ backgroundColor: 'lightgrey', borderRadius: 10, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>{restaurant.rating}</p>
                </div>
            </div>
        </div>
    );
}