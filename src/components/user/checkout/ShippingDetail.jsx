import React from 'react'
import StepTracker from './StepTracker'

function ShippingDetail() {
  return (
    <div className="shipping-detail">
      <StepTracker current={2} />
      <h3>Thông tin giao hàng</h3>

      <div className="shipping-form">
        <div className="form-group">
          <label htmlFor="">Họ Tên</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="">Số điện thoại</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="">Địa chỉ</label>
          <input type="text" />
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
    </div>
  );
}

export default ShippingDetail