import React from "react";
import ProductSpecsTable from './ProductSpecsTable';

function ProductDetailBody(detailProduct) {
  const product = detailProduct.detailProduct;

  return (
    <>
      <div className="detail-body">
        <div className="detail-body-left">
          <h3 className="product-detail-title">
            Product description {product.title}
          </h3>
          <div className="product-detail-content">
            <p>
              {product.description}
            </p>
          </div>
        </div>
        <div className="detail-body-right">
          <h3 className="product-specs-title">
            <b>Thông số kỹ thuật</b>
          </h3>
          <ProductSpecsTable feature={product.feature}/>
        </div>
      </div>
    </>
  );
}

export default ProductDetailBody