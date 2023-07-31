//home screen -- add styling and see a list of default list of restaurants.  Add a few random restaurants to a database rather than a full API

import React, { useState, useEffect } from 'react';
import RestaurantItem from '../../components/RestaurantItem/index';
import { DataStore } from 'aws-amplify'
import { Restaurant } from '../../models'

function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    DataStore.query(Restaurant)
      .then(setRestaurants)
  }, [])

  return (
    <div className="container">
      <div className="row">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="col-md-4 mb-4" style={{ cursor: 'pointer' }}>
            <RestaurantItem restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;