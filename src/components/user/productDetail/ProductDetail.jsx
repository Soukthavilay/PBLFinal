import { useContext, useEffect, useState } from 'react'
import ProductDetailBody from '../../utils/productDetail/ProductDetailBody';
import ProductDetailHeader from '../../utils/productDetail/ProductDetailHeader';
import ProductReviews from '../../utils/productDetail/ProductReviews';
import Recommand from "../../utils/productItem/Recommand";
import { GlobalState } from '../../../GlobalState';
import { useParams, Link } from 'react-router-dom';

import "../../utils/scss/product-detail.scss";

function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(()=>{
    if(params.id){
      products.forEach((product)=>{
        if(product._id === params.id){
          setDetailProduct(product);
        }
      })
    }
  },[params.id, products]);

  if (detailProduct.length === 0) return null;
  return (
    <>
      <div className="product-detail">
        <ProductDetailHeader detailProduct={detailProduct}/>
        <ProductDetailBody detailProduct={detailProduct}/>
        <ProductReviews detailProduct={detailProduct}/>
        <Recommand />
      </div>
    </>
  );
}

export default ProductDetail