import React from 'react'
import ProductDetailBody from '../../utils/productDetail/ProductDetailBody';
import ProductDetailHeader from '../../utils/productDetail/ProductDetailHeader';
import ProductReviews from '../../utils/productDetail/ProductReviews';

import "../../utils/scss/product-detail.scss";

function ProductDetail() {
  return (
    <>
      <div className="product-detail">
        <ProductDetailHeader />
        <ProductDetailBody />
        <ProductReviews />
      </div>
    </>
  );
}

export default ProductDetail