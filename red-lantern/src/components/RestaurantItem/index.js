import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantItem = ({ restaurant }) => {
    const navigation = useNavigate();

    const handleClick = () => {
        navigation(`/restaurants/${restaurant.id}`)
    }

    return (
        <Card className='h-100' onClick={handleClick}>
            <Card.Img variant='top' src={restaurant.image} alt={restaurant.name} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text style={{ fontSize: 12, color: 'gray' }}>
                    ${restaurant.deliveryFee.toFixed(2)} &nbsp;&nbsp; {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} minutes
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RestaurantItem;