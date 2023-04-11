import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import ProductAPI from './api/ProductAPI';



export const GlobalState = createContext();

export const DataProvider = ({childen}) => {
    const [token, setToken] = useState(false);

    const state = {
        token:[token, setToken],
        productAPI: ProductAPI(),
    };
    return <GlobalState.Provider value={state}>{childen}</GlobalState.Provider>;

}