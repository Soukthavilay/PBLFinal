import "../../utils/scss/profile.scss";
import MyOrders from './MyOrders';
import { GlobalState } from "../../../GlobalState";
import { useContext } from "react";
import OrderDetail from "./OrderDetail";
import ProfileOption from "./ProfileOption";
import Loading from "../../utils/Loading/Loading";
import { useState } from "react";
import { useEffect } from "react";
function UserProfile() {
  const state = useContext(GlobalState);
  const [myOrder] = state.userAPI.order;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (myOrder.length === 0 || myOrder === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [myOrder]);

  return (
    <>
    {loading ? <>{loading && <Loading />}</> : <>
    <div className='profile'>
      <ProfileOption />
      <div className="profile-content">
        {/* <h4 className='profile-content-title'>Please select an option</h4> */}
        <div className="orders">
          <h2 className="orders-title">My Orders</h2>
          <div className="orders-list">
            {myOrder?.map((item)=>{
              return (
                <MyOrders key={item._id} order={item} />
              )
            })}
          </div>
        {/* <MyOrders order={myOrder}/> */}
        </div>
        {/* <OrderDetail/> */}
      </div>
    </div>
    </>}
    </>
  )
}

export default UserProfile