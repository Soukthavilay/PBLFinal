import React from 'react'
import { Link } from "react-router-dom";

function ProfileOption() {
  return (
    <div className="profile-option">
      <div className="profile-option-item">
        <Link to="/myInfo">My Info</Link>
      </div>
      <div className="profile-option-item">
        <Link to="/profile">My Orders</Link>
      </div>
    </div>
  );
}

export default ProfileOption