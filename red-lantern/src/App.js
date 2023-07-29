import HomeScreen from './pages/HomeScreen';
import Navbar from './components/Navbar';
import RestaurantDetails from './pages/RestaurantDetails';

import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import config from './aws-exports';
Amplify.configure(config)

function App() {
  const handleSignOut = () => {
    Auth.signOut()
      .then(() => console.log('Successfully signed out'))
      .catch(err => console.log('Error signing out:', err));
  };

  return (
    <div style={{ width: '100%' }}>

      <Navbar signOut={handleSignOut} />

      {/* <HomeScreen /> */}

      <RestaurantDetails />

    </div>
  )
}

export default withAuthenticator(App);