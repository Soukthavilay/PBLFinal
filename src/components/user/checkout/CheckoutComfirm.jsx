import React from 'react'
import StepTracker from './StepTracker'

function CheckoutConfirm() {
  return (
    <div className="checkout-confirm">
      <StepTracker current={3} />
      
      <h3>Order has been received</h3>

      <p>Delivery time is about 4-5 days</p>

      <h3>Thank you for trusting our purchase!</h3>

      <button className="btn btn--animated btn--primary--blue btn--border--blue">
        Continue to shopping
      </button>
    </div>
  );
}

export default CheckoutConfirm;