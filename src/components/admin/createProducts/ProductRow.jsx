import {GlobalState} from '../../../GlobalState';
import { useContext, useEffect, useState } from 'react';

const ProductRow = (productShow) => {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const product = productShow.productShow;
    const [newNameCate,setNewNameCate] = useState();
    useEffect(()=>{
        categories.map((item)=>{
            if (item._id === product.category){
                setNewNameCate(item.name);
            }
        });
    },[categories,product])
    
  return (
    <>
        <div className="products-row">
            <button className="cell-more-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
                <div className="product-cell image">
                <img src={product.images.url} alt={product.images.url}/>
                <span>{product.name}</span>
                </div>
            <div className="product-cell category"><span className="cell-label">Category:</span>{newNameCate ? newNameCate : product.category}</div>
            <div className="product-cell status-cell">
                <span className="cell-label">Status:</span>
                <span className="status active">Active</span>
            </div>
            <div className="product-cell sales"><span className="cell-label">Sales:</span>{product.sold}</div>
            <div className="product-cell stock"><span className="cell-label">Stock:</span>{product.amount}</div>
            <div className="product-cell price"><span className="cell-label">Price:</span>{product.price}</div>
        </div>
    </>
  )
}

export default ProductRow