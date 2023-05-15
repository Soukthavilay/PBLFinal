import React from 'react'
import StepTracker from './StepTracker'

function Payment() {
  return (
    <div className="payment">
      <StepTracker current={3} />

      <h3>Đơn hàng đã được ghi nhận</h3>

      <p>Thời gian giao hàng khoảng 4 - 5 ngày</p>
    
      <h3>Cảm ơn quý khách đã tin tưởng mua hàng của chúng tôi!</h3>
    </div>
  )
}

export default Payment