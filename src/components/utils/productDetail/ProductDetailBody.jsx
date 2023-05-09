import React from 'react'
import ProductFeaturesTable from './ProductFeaturesTable';

function ProductDetailBody() {
  const productName = "Apple iPhone 14 Pro 512GB 6.1";
  return (
    <>
      <div className="detail-body">
        <div className="detail-body-left">
          <h3 className="product-detail-title">
            Product description {productName}
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            omnis voluptas, assumenda accusamus dolorum provident officia qui?
            Deserunt libero tenetur dolor provident, earum reprehenderit officia
            numquam minima vitae eligendi unde.
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              recusandae soluta temporibus expedita neque tempora, facere qui
              voluptatibus praesentium, laboriosam atque commodi, tenetur
              consequatur enim beatae repellendus corrupti molestiae dolorum.
            </p>
          </p>
        </div>
        <div className="detail-body-right">
          <h2 className="product-features-title">
            <b>Features</b> {productName}
          </h2>
          <ProductFeaturesTable />
        </div>
      </div>
    </>
  );
}

export default ProductDetailBody