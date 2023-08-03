import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import { View, Image, useTheme, Text, Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './pages/HomeScreen';
import CustomNavbar from './components/Navbar';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RestaurantDetails from './pages/RestaurantDetails';
import Item from './pages/item';
import ProfileScreen from './pages/profileScreen';
import Cart from './pages/cart';
import Footer from './components/Footer'
import { useAuthContext } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

Amplify.configure(awsExports);

function App() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)
  const { dbUser } = useAuthContext();

  const handleSignOut = () => {
    Auth.signOut()
      .then(() => console.log('Successfully signed out'))
      .catch((err) => console.log('Error signing out:', err));
  };

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image alt="Contacts App" src="/img/logo.png" />
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; 2022 Jeremy Lehmann, Jeffrey Smith, Jasmina Topalovic, Syrinthia Swift, Aphra
          </Text>
        </View>
      );
    },
  };

  return (
    <CartProvider>
      <Authenticator loginMechanisms={['email']} components={components}>
        {({ signOut, user }) => (
          <div>
            <Router>
              <CustomNavbar
                signOut={handleSignOut}
                setCartItems={setCartItemsCount}
                cartItems={cartItemsCount}
                totalPrice={totalPrice}
              />
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                <Route path="/restaurants/:id/item/:mealId" element={<Item cartItemsCount={cartItemsCount} setCartItemsCount={setCartItemsCount} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='/cart' element={<Cart totalPrice={totalPrice} cartItemsCount={cartItemsCount} />} />
                {dbUser ? (
                  <Route path="/" element={<HomeScreen />} />
                ) : (
                  <Route path="/profile" element={<ProfileScreen />} />
                )}
              </Routes>
            </Router>
          </div>
        )}
      </Authenticator>
      <Footer />
    </CartProvider>

  );
}

export default App;