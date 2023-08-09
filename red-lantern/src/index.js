// Importing required modules and styles
import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM used to render React components in the DOM
import './index.css'; // Importing custom styles
import App from './App'; // Importing the main application component
import reportWebVitals from './reportWebVitals'; // Importing utility for reporting web performance metrics

// Importing context providers for application state management
import { TotalPriceProvider } from './contexts/TotalPriceContext';
import { CartProvider } from './contexts/CartContext';

// Importing AWS Amplify components and styles
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { AmplifyProvider } from '@aws-amplify/ui-react';

// Configuring AWS Amplify with provided configuration
Amplify.configure(config);

// Defining a custom theme for the application
const theme = {
  name: 'Authentication Theme',
  tokens: {
    colors: {
      background: {
        primary: { value: 'white' }
      },
      text: {
        primary: { value: '#DC143C' }
      },
      brand: {
        primary: {
          '10': '#DC143C',
          '80': '#DC143C',
          '90': '#DC143C',
          '100': '#DC143C'
        },
      },
    },
    components: {
      tabs: {
        item: {
          _active: {
            color: { value: '#DC143C' }
          },
          _hover: {
            color: { value: '#DC143C' }
          },
          _focus: {
            color: { value: '#DC143C' }
          },
        },
      },
    },
  },
};

// Creating a root element to render the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main application component within context providers and strict mode
root.render(
  <AmplifyProvider theme={theme}>
    <React.StrictMode>
      <CartProvider>
        <TotalPriceProvider>
          <App /> {/* The main application component */}
        </TotalPriceProvider>
      </CartProvider>
    </React.StrictMode>
  </AmplifyProvider>
);

// Reporting web performance metrics
reportWebVitals();
