import React from 'react'
import "../../utils/scss/profile.scss";
import MyOrders from './MyOrders';
function UserProfile() {
  return (
    <div className='profile'>
      <div className="profile-option">
        <div className="profile-avatar">
          <img src="" alt="" />
        </div>
        <div className="profile-option-item">
          <a href="">My Info</a>
        </div>
        <div className="profile-option-item">
          <a href="">My Orders</a>
        </div>
      </div>
      <div className="profile-content">
        {/* <h4 className='profile-content-title'>Please select an option</h4> */}
        <MyOrders />
      </div>
    </div>
  )
}

export default UserProfile