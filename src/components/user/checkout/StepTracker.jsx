import React from 'react'
import '../../utils/scss/checkout.scss'

function StepTracker({ current }) {
  const className = (step) =>
    current === step ? "is-active-step" : step < current ? "is-done-step" : "";

  return (
    <div className="checkout-header">
      <ul className="checkout-header-menu">
        <li className={`checkout-header-list ${className(1)}`}>
          <div className="checkout-header-item">
            <div className="checkout-header-icon">
              <h4 className="checkout-header-step">1</h4>
            </div>
            <h6 className="checkout-header-subtitle">Check Order</h6>
          </div>
        </li>
        <li className={`checkout-header-list ${className(2)}`}>
          <div className="checkout-header-item">
            <div className="checkout-header-icon">
              <h4 className="checkout-header-step">2</h4>
            </div>
            <h6 className="checkout-header-subtitle">Shipment Details</h6>
          </div>
        </li>
        {/* <li className={`checkout-header-list ${className(3)}`}>
          <div className="checkout-header-item">
            <div className="checkout-header-icon">
              <h4 className="checkout-header-step">3</h4>
            </div>
            <h6 className="checkout-header-subtitle">Payment Method</h6>
          </div>
        </li> */}
        <li className={`checkout-header-list ${className(3)}`}>
          <div className="checkout-header-item">
            <div className="checkout-header-icon">
              <h4 className="checkout-header-step">3</h4>
            </div>
            <h6 className="checkout-header-subtitle">Successful order</h6>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default StepTracker