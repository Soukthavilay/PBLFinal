import React, { useState } from 'react'
import StepTracker from './StepTracker';

function OrderSummary() {
  var productPrice = 20000000;
  var [quantity, setQuantity] = useState(0);
  return (
    <div className="order-summary">
      <StepTracker current={1} />
      <h2 className="order-summary-title">Thông tin giỏ hàng</h2>
      <p className="order-summary-subtitle">
        Kiểm tra lại sản phẩm trong giỏ của bạn
      </p>
      <div className="order-summary-product">
        <div className="order-product-item">
          <div className="product-image">
            <img
              src="https://res.cloudinary.com/dkiofoako/image/upload/v1683619503/PBL/ip14_ubehzb.jpg"
              alt=""
            />
            <div className="product-name">
              <h3>iPhone 14 Pro Max</h3>
            </div>
          </div>
          <div className="product-detail-quantity">
            <div className="product-quantity">
              <button
                className="quantity-btn"
                onClick={() => setQuantity((c) => Math.max(c - 1, 0))}
              >
                -
              </button>
              <input type="number" value={quantity} />
              <button
                className="quantity-btn"
                onClick={() => setQuantity((c) => c + 1)}
              >
                +
              </button>
            </div>
            <div className="product-remove">
              <button className="remove-btn">Xóa</button>
            </div>
          </div>
          <div className="product-detail-price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(productPrice)}
          </div>
        </div>
        <div className="order-product-item">
          <div className="product-image">
            <img
              src="https://res.cloudinary.com/dkiofoako/image/upload/v1683619503/PBL/ip14_ubehzb.jpg"
              alt=""
            />
            <div className="product-name">
              <h3>iPhone 14 Pro Max</h3>
            </div>
          </div>
          <div className="product-detail-quantity">
            <div className="product-quantity">
              <button
                className="quantity-btn"
                onClick={() => setQuantity((c) => Math.max(c - 1, 0))}
              >
                -
              </button>
              <input type="number" value={quantity} />
              <button
                className="quantity-btn"
                onClick={() => setQuantity((c) => c + 1)}
              >
                +
              </button>
            </div>
            <div className="product-remove">
              <button className="remove-btn">Xóa</button>
            </div>
          </div>
          <div className="product-detail-price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(productPrice)}
          </div>
        </div>
      </div>

      <div className="checkout-buttons">
        <button className="btn btn--animated btn--primary--blue btn--border--blue">
          Tiếp tục mua
        </button>
        <button className="btn btn--animated btn--primary--white btn--border--blue">
          Tiếp theo
        </button>
      </div>
    </div>
  );
}

export default OrderSummary