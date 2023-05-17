import React, { useState } from 'react'
import StepTracker from './StepTracker'

function ShippingDetail() {
  const [payment, setPayment] = useState("");

  function selectPayment(e) {
    // const cod = calculateTotal(
    //   cartItems.map((item) => item.giakm * item.soluong)
    // );
    // if (value === "cod") {
    //   setTotalPrice(cod + 25000);
    // }
    
    setPayment(e.target.value);
    handleToggle();
    console.log(e.target.value)
  }

  const [showHideComment, setShowHidePaymentMethod] = useState(false);
  const handleToggle = () => {
    setShowHidePaymentMethod(!showHideComment);
  };

  return (
    <div className="shipping-detail">
      <StepTracker current={2} />
      <h3 className="shipping-detail-title">Thông tin giao hàng</h3>

      <div className="shipping-detail-form">
        <div className="form-group">
          <label htmlFor="fullname">Họ Tên</label>
          <input type="text" name="fullname" placeholder="Họ và tên" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber">Số điện thoại</label>
          <input type="number" name="phonenumber" placeholder="Số điện thoại" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input name="address" type="text" placeholder="Địa chỉ" />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method">Phương thức thanh toán</label>
          <select
            name="payment-method"
            id="paymentMethod"
            onChange={selectPayment}
          >
            <option value="cod">Ship cod</option>
            {/* <option value="online">Chuyển khoản</option> */}
            <option value="paypal">Paypal</option>
          </select>
          {/* {payment === "online" ? (
            <div
              className={
                setShowHidePaymentMethod
                  ? "checkout-collapse-sub active"
                  : "checkout-collapse-sub"
              }
            >
              <p>Thông Tin Chuyển Khoản:</p>
              <p>VIETCOMBANK - 123456789</p>
              <p>Koh dep zai</p>
            </div>
          ) : null} */}
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