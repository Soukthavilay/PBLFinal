import React from 'react'
import ip14 from '../../../assets/ip14.jpg'

function MyOrders() {
  return (
    <div className="orders">
      <h2>My Orders</h2>
      <div className="orders-list">
        <div className="order-item">
          <div className="order-item-header">
            <span className="order-number">#123456</span>
            <span className="order-status">Delivered</span>
          </div>
          <div className="order-item-body">
            <div className="order-product">
              <div className="order-product-img">
                <img src={ip14} alt="" />
              </div>
              <div className="order-product-info">
                <h3 className="product-name">
                  <a href="">iPhone 14 Pro Max sieu cap vip pro ahjsdgasydg
                  </a>
                </h3>
                <span className="product-type">Purple</span>
              </div>
              <div className="order-product-price">20,000,000 vnd</div>
              <div className="order-product-quantity">Qty: 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders