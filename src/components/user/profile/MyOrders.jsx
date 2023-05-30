import { Link } from "react-router-dom";

function MyOrders(order) {
  const myOrder = order.order;
  return (
    <div className="order-item">
      <div className="order-item-header">
        <span className="order-number">#{myOrder._id.slice(-6)}</span>
        <span className="order-status">{myOrder.status}</span>
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
              {orderItem.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
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
