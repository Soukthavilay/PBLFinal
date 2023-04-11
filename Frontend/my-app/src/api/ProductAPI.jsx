import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductAPI(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const getProducts= async ()=>{
            const res = await axios.get('https://fakestoreapi.com/products');
            setProducts(res.data);
        };
        getProducts();
    },[]);

    return {
        products: [products, setProducts],
    }
}

export default ProductAPI;         