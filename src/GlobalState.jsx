import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserAPI from './api/UserAPI';
import ProductsAPI from './api/ProductsAPI';
import CategoriesAPI from './api/CategoriesAPI';
import axios from 'axios';
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const refreshToken = async () => {
        const token = await axios.get('http://localhost:5000/user/refresh_token',{ withCredentials: true })
        console.log(token)
    }
    useEffect (()=>{
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) refreshToken();
    })
    

    const state = {
        token: [token, setToken],
        // userAPI: UserAPI(token),
        // categoriesAPI: CategoriesAPI(),
        // productsAPI: ProductsAPI(),
    };

    return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};