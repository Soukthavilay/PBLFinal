import { Link } from 'react-router-dom'

function MyInfo() {
  return (
    <div className='info'>
      <div className="profile-option-item">
          <Link to="/myInfo">My Info</Link>
        </div>
        <div className="profile-option-item">
          <Link to="/profile">My Orders</Link>
        </div>
      <h2>My Information</h2>
    </div>
  )
}

export default MyInfo