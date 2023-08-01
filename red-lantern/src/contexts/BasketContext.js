import { createContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketDish } from '../models'

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
    return (
        <BasketContext.Provider>
            {children}
        </BasketContext.Provider>
    )
}

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);