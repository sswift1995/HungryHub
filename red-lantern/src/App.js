import HomeScreen from './pages/HomeScreen';
import CustomNavbar from './components/Navbar';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RestaurantDetails from './pages/RestaurantDetails';
import Item from './pages/item';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from '../src/contexts/AuthContext'
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Amplify, Auth } from 'aws-amplify';
import { View, Image, useTheme, Text, Authenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
Amplify.configure(awsExports)

function App() {
  const handleSignOut = () => {
    Auth.signOut()
      .then(() => console.log('Successfully signed out'))
      .catch(err => console.log('Error signing out:', err));
  };

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Contacts App"
            src="/img/logo.png"
          />
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; 2022 Jeremy Lehmann, Jeffrey Smith, Jasmina Topalovic, Syrinthia Swift, Aphra Hiat
          </Text>
        </View>
      );
    },
  };

  return (
    <Authenticator loginMechanisms={['email']} components={components}>
      {({ signOut, user }) => (
        <div>
          <CustomNavbar signOut={handleSignOut} />
          <Router>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/restaurants/:id' element={<RestaurantDetails />} />
              <Route path='/restaurants/:id/item' element={<Item />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<profileScreen />} />
              {/* <Route path='/' element={loading ? () => <profileScreen/> : () => <HomeScreen/>} /> */}
            </Routes>
          </Router>
          <Footer />
        </div>
      )}
    </Authenticator>
    
  );
}

export default App;