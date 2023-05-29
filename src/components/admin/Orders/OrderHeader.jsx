import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { useContext } from "react";

const OrderHeader = (order) => {
    const orderData = order.order;
    const state = useContext(GlobalState);
    const [token] = state.token;


    const handleConfirm = () => {
        updateOrderStatus(orderData._id, "Confirmed");
    };
    
    const handleCancel = () => {
        updateOrderStatus(orderData._id, "Cancelled");
    };
    const updateOrderStatus = (orderId, newStatus) => {
        const url = `http://localhost:5000/api/update-status/${orderId}`;
        const config = {
            headers: {
              Authorization: token
            }
          };
        axios.put(url, {status : newStatus},config).then(res => {
            alert("Order status updated successfully");
            window.location.reload();
        }).catch(err => {
            console.error("Error updating order status:", err);
        })
    }

    const createdAtDateTime = new Date(orderData.createdAt);
    const currentDateTime = new Date();
    const minutesDifference = Math.floor(
        (createdAtDateTime - currentDateTime) / (1000 * 60)
    );
    const formattedDateTime = createdAtDateTime.toLocaleString();
  return (
    <>
        <div className="products-header">
            <div className="product-cell image">
                Order of User : {orderData.name}
            </div>
            <div className="product-cell image">
                <button className="app-content-headerButton button" onClick={handleConfirm}>Confirm</button>
                <button className="app-content-headerButton button" onClick={handleCancel}>Cancel</button>
            </div>
            <div className="product-cell image">
                {formattedDateTime} 
            </div>
        </div>
    </>
  )
}

export default OrderHeader