import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyOrders(order) {
  const myOrder = order.order;
  const [total,setTotal] = useState(0);
  useEffect(()=>{
    if(myOrder){
      myOrder.listOrderItems?.map((item) =>{
        const rs = item.price * item.quantity;
        setTotal(rs);
      })
    }
  },[myOrder]);

  const createdAtDateTime = new Date(myOrder.createdAt);
  const currentDateTime = new Date();
  const minutesDifference = Math.floor(
    (createdAtDateTime - currentDateTime) / (1000 * 60)
  );
  const formattedDateTime = createdAtDateTime.toLocaleString();
  let content;
  switch (myOrder && myOrder.status) {
    case 'Delivered':
      content = <span className="order-confirmed order-status">{myOrder.status}</span>;
      break;
    case 'Cancelled':
      content = <span className="order-cancelled order-status">{myOrder.status}</span>;
      break;
    case 'Cancel Requested':
      content = <span className="order-cancelled order-status">{myOrder.status}</span>;
      break;
    case 'Shipping':
      content = <span className="order-confirmed order-status">{myOrder.status}</span>;
      break;
    case 'Confirmed':
      content = <span className="order-confirmed order-status">{myOrder.status}</span>;
      break;
    case 'Pending':
      content = <span className="order-pending order-status">{myOrder.status}</span>;
      break;
    case 'Paid':
      content = <span className="order-confirmed order-status">{myOrder.status}</span>;
      break;  
    default:
      content = <div></div>;
      break;
  }
  return (
    <div className="order-item">
      <div className="order-item-header">
        <div>
        <span className="order-number">#{myOrder._id.slice(-6)}</span>
        <span className="order-number">{formattedDateTime}</span>
        </div>
        {content}
      </div>
      <div className="order-item-body">
        {myOrder.listOrderItems?.map((orderItem) => (
          <div className="order-product" key={orderItem._id}>
            <div className="order-product-img">
              <img
                src={orderItem.images.url}
                alt={
                  "product-image"
                }
              />
            </div>
            <div className="order-product-info">
              <h3 className="product-name">
                <Link to={`/order-detail/${myOrder._id}`}>
                  {orderItem.title}
                </Link>
              </h3>
              <span className="product-type">{orderItem.feature.color}</span>
            </div>
            <div className="order-product-price">
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>

            <div className="order-product-quantity">
              Qty: {orderItem.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
