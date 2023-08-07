import React, { useState, useEffect } from 'react';
import RestaurantItem from '../../components/RestaurantItem/index';

function HomeScreen({ restaurants, searchQuery }) {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    if (searchQuery && restaurants) {
      // Filter the restaurants based on the search query
      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.name && restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      // If no search query, show all restaurants
      setFilteredRestaurants(restaurants);
    }
  }, [searchQuery, restaurants]);

  return (
    <div>
      <div className="container">
        <div className="row">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4" style={{ cursor: 'pointer' }}>
              <RestaurantItem restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;