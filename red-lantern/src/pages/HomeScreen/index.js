//home screen -- add styling and see a list of default list of restaurants.  Add a few random restaurants to a database rather than a full API

import React from 'react';
import RestaurantItem from '../../components/RestaurantItem/index';
import restaurants from '../../data/restaurants.json';

function HomeScreen() {
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