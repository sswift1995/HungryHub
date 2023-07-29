import RestaurantItem from '../../components/RestaurantItem/index'
import restaurants from '../../data/restaurants.json';

function HomeScreen() {
    return (
        <div style={{ width: '100%' }}>
            {restaurants.map((restaurant, index) => (
                <div key={index} className="restaurant-item">
                    <RestaurantItem restaurant={restaurant} />
                </div>
            ))}
        </div>
    );
}

export default HomeScreen;