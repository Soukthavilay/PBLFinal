import "../../utils/scss/profile.scss";
import MyOrders from './MyOrders';
import { GlobalState } from "../../../GlobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";
function UserProfile() {
  const state = useContext(GlobalState);
  const [myOrder] = state.userAPI.order;

  return (
    <div className='profile'>
      <div className="profile-option">
        <div className="profile-avatar">
          <img src="" alt="" />
        </div>
        <div className="profile-option-item">
          <Link to="">My Info</Link>
        </div>
        <div className="profile-option-item">
          <Link to="">My Orders</Link>
        </div>
      </div>
      <div className="profile-content">
        {/* <h4 className='profile-content-title'>Please select an option</h4> */}
        <div className="orders">
          <h2>My Orders</h2>
          <div className="orders-list">
            {myOrder?.map((item)=>{
              return (
                <MyOrders key={item._id} order={item} />
              )
            })}
          </div>
        {/* <MyOrders order={myOrder}/> */}
        </div>
      </div>
    </div>
  )
}

export default UserProfile