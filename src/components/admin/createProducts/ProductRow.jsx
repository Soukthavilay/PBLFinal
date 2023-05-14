import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import { useContext } from 'react';

const ProductRow = () => {
    const state = useContext(GlobalState);
    console.log(state.productsAPI.products);
  return (
    <>
        <div className="products-row">
            <button className="cell-more-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
                <div className="product-cell image">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="product"/>
                <span>Ocean</span>
                </div>
            <div className="product-cell category"><span className="cell-label">Category:</span>Furniture</div>
            <div className="product-cell status-cell">
                <span className="cell-label">Status:</span>
                <span className="status active">Active</span>
            </div>
            <div className="product-cell sales"><span className="cell-label">Sales:</span>11</div>
            <div className="product-cell stock"><span className="cell-label">Stock:</span>36</div>
            <div className="product-cell price"><span className="cell-label">Price:</span>$560</div>
        </div>
    </>
  )
}

export default ProductRow