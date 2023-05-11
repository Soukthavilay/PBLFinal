import React from 'react'
import ProductDetailBody from '../../utils/productDetail/ProductDetailBody';
import ProductDetailHeader from '../../utils/productDetail/ProductDetailHeader';
import ProductReviews from '../../utils/productDetail/ProductReviews';
import Recommand from "../../utils/productItem/Recommand";

import "../../utils/scss/product-detail.scss";

function ProductDetail() {
  return (
    <>
      <div className="product-detail">
        <ProductDetailHeader />
        <ProductDetailBody />
        <ProductReviews />
        <Recommand />
      </div>
    </>
  );
}

export default ProductDetail