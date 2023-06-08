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
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (myOrder.length === 0 || myOrder === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [myOrder]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const filteredOrders = selectedStatus
  ? myOrder.filter((order) => order.status === selectedStatus)
  : myOrder;

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortType === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortType === "expensive") {
      // const priceA = a.listOrderItems[0]?.price || 0;
      // const priceB = b.listOrderItems[0]?.price || 0;
      const priceA = a.total;
      const priceB = b.total;
      return priceB - priceA;
    } else if (sortType === "cheap") {
      const priceA = a.total;
      const priceB = b.total;
      return priceA - priceB;
    }
  });
  const filteredSearch = sortedOrders.filter((order) =>{
    return order.listOrderItems.some((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
});
  const handleSortTypeChange = (e) => {
    const selectedSortType = e.target.value;
    setSortType(selectedSortType);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
    {loading ? <>{loading && <Loading />}</> : <>
    <div className='profile'>
      <ProfileOption />
      <div className="profile-content">
        <div className="orders">
          <div className="order-wrapper">
            <h2 className="orders-title">My Orders</h2>
            <div className="order-search">
              <input type="text" name="search" placeholder="Find product..." value={searchTerm}
                      onChange={handleSearchChange}/>
            </div>
            <div className="order-select">
              <select className="select-status"
                name="select-status"
                id="selectStatus"
                value={selectedStatus}
                onChange={handleStatusChange}>
                  <option value="">All Orders</option>
                  <option value="Pending">Order Pending</option>
                  <option value="Confirmed">Order Confirmed</option>
                  <option value="Shipping">Order Shipping</option>
                  <option value="Paid">Order Paid</option>
                  <option value="Cancelled">Order Cancelled</option>
                  <option value="Cancel Requested">Cancel Requested</option>
                  <option value="Delivered">Order Delivered</option>
              </select>
              <select className="select-status" name="sort" id="short-time" onChange={handleSortTypeChange}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="expensive">Expensive Price</option>
                <option value="cheap">Cheap Price</option>
              </select>
            </div>
          </div>
          <div className="orders-list">
            {filteredSearch?.map((item)=>{
              return (
                <MyOrders key={item._id} order={item} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </>}
    </>
  )
}

export default UserProfile