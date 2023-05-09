import React from 'react'
import ProductDetailBody from '../../utils/productDetail/ProductDetailBody';
import ProductDetailHeader from '../../utils/productDetail/ProductDetailHeader';

import "../../utils/scss/product-detail.scss";

function ProductDetail() {
  return (
    <>
      <div className="product-detail">
        <ProductDetailHeader />
        <ProductDetailBody />
      </div>
    </>
  );
}

export default ProductDetail