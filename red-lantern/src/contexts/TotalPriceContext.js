import React, { createContext, useContext, useState } from 'react';

// Create the TotalPriceContext
const TotalPriceContext = createContext();

// Create a custom hook to access the TotalPriceContext
export const useTotalPriceContext = () => useContext(TotalPriceContext);

// TotalPriceProvider component to wrap the application and manage the totalPrice state
export const TotalPriceProvider = ({ children }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    // Function to reset totalPrice to 0
    const resetTotalPrice = () => {
        setTotalPrice(0);
    };

    return (
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice, resetTotalPrice }}>
            {children}
        </TotalPriceContext.Provider>
    );
};