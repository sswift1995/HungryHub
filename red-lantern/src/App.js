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
import Footer from './components/Footer';
import OrderDetails from './pages/OrderDetails';
import { useAuthContext } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { TotalPriceProvider } from './contexts/TotalPriceContext';
import OrderDelivered from './pages/OrderDelivered';

Amplify.configure(awsExports);

function App() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { dbUser } = useAuthContext();

  // Sign out
  const handleSignOut = () => {
    Auth.signOut()
      .then(() => console.log('Successfully signed out'))
      .catch((err) => console.log('Error signing out:', err));
  };

  // TODO:
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
            &copy; 2023 Aphra Hiat, Jeremy Lehmann, Jeffrey Smith, <br></br>Syrinthia Swift, Jasmina Topalovic
          </Text>
        </View>
      );
    },
  };

  return (
    <TotalPriceProvider>
      <CartProvider>
        <Authenticator loginMechanisms={['email']} components={components}>
          {({ signOut, user }) => (
            <div>
              <Router>
                <CustomNavbar
                  signOut={handleSignOut}
                  setCartItems={setCartItemsCount}
                  cartItems={cartItemsCount}
                />
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/restaurants/:id" element={<RestaurantDetails cartItemsCount={cartItemsCount} setCartItemsCount={setCartItemsCount} />} />
                  <Route path="/restaurants/:id/item/:mealId" element={<Item cartItemsCount={cartItemsCount} setCartItemsCount={setCartItemsCount} />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path='/order-details' element={<OrderDetails />} />
                  <Route path='/delivered' element={<OrderDelivered />} />
                  <Route path='/cart' element={<Cart cartItemsCount={cartItemsCount} setCartItemsCount={setCartItemsCount} />} />
                  <Route path='/profile' element={<ProfileScreen />} />
                </Routes>
              </Router>
            </div>
          )}
        </Authenticator>
        <Footer />
      </CartProvider>
    </TotalPriceProvider>
  );
}

export default App;