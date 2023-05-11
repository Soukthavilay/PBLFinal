import React from "react";
import ProductSpecsTable from './ProductSpecsTable';

function ProductDetailBody() {
  const productName = "Apple iPhone 14 Pro 512GB 6.1";

  return (
    <>
      <div className="detail-body">
        <div className="detail-body-left">
          <h3 className="product-detail-title">
            Product description {productName}
          </h3>
          <div className="product-detail-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam omnis voluptas, assumenda accusamus dolorum provident
              officia qui? Deserunt libero tenetur dolor provident, earum
              reprehenderit officia numquam minima vitae eligendi unde.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              recusandae soluta temporibus expedita neque tempora, facere qui
              voluptatibus praesentium, laboriosam atque commodi, tenetur
              consequatur enim beatae repellendus corrupti molestiae dolorum.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              recusandae soluta temporibus expedita neque tempora, facere qui
              voluptatibus praesentium, laboriosam atque commodi, tenetur
              consequatur enim beatae repellendus corrupti molestiae dolorum.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              recusandae soluta temporibus expedita neque tempora, facere qui
              voluptatibus praesentium, laboriosam atque commodi, tenetur
              consequatur enim beatae repellendus corrupti molestiae dolorum.
            </p>
          </div>
        </div>
        <div className="detail-body-right">
          <h3 className="product-specs-title">
            <b>Thông số kỹ thuật</b>
          </h3>
          <ProductSpecsTable />
        </div>
      </div>
    </>
  );
}

export default ProductDetailBody