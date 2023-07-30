//home screen -- add styling and see a list of default list of restaurants.  Add a few random restaurants to a database rather than a full API

import React, { useState, useEffect } from 'react';
import RestaurantItem from '../../components/RestaurantItem/index';
import restaurants from '../../data/restaurants.json';
import { DataStore } from 'aws-amplify'
import {Restaurant} from '../../models'

function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const results = await DataStore.query(Restaurant)
    setRestaurants(results)
  }

  useEffect(() => {
    fetchRestaurants();
  }, [])


  return (
    <div className="container">
      <div className="row">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="col-md-4 mb-4">
            {/* Wrap RestaurantItem with an anchor tag */}
            <a href={`/restaurants/${restaurant.id}`}>
              <RestaurantItem restaurant={restaurant} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;