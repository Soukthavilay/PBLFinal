import React from "react";
import ProductSpecsTable from './ProductSpecsTable';
import parse from 'html-react-parser';

function ProductDetailBody(detailProduct) {
  const product = detailProduct.detailProduct;

  return (
    <>
      <div className="detail-body">
        <div className="detail-body-left">
          <h3 className="product-detail-title">
            {/* Product description {product.title} */}
          </h3>
          <div className="product-detail-content">
            {parse(`${product.description}`)}
          </div>
        </div>
        <div className="detail-body-right">
          <h3 className="product-specs-title">
            <b>Specifications</b>
          </h3>
          <ProductSpecsTable feature={product.feature} />
        </div>
      </div>
    </>
  );
}

export default ProductDetailBody