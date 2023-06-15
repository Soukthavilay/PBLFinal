import React from 'react'
import StepTracker from './StepTracker'
import {Link} from 'react-router-dom';

function CheckoutConfirm() {
  return (
    <div className="checkout-confirm">
      <StepTracker current={3} />
      
      <h3>Order has been received</h3>

      <p>Delivery time is about 4-5 days</p>

      <h3>Thank you for trusting our purchase!</h3>

      <Link to='/'>
        <button className="btn btn--animated btn--primary--blue btn--border--blue">
          Continue to shopping
        </button>
      </Link>
    </div>
  );
}

export default CheckoutConfirm;