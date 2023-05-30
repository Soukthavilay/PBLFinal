import React from 'react'
import OrderHeader from '../Orders/OrderHeader'
import { Link } from 'react-router-dom';

const OrderCancel = (order) => {
    const orderItem = order.orders
  return (
    <>
        <OrderHeader key={orderItem._id} order={orderItem} />
        <div className="products-header">
        <div className="product-cell image">Item</div>
        <div className="product-cell status-cell">Status</div>
        <div className="product-cell sales">Quantity</div>
        <div className="product-cell stock">Band</div>
        <div className="product-cell price">Price</div>
        </div>
        {orderItem.listOrderItems.map((item) => (
            <Link key={item._id} to={{
              pathname: `/admin/orderDetail/${orderItem._id}`,
              state: { orderItem }}}>
            <div className="products-row">
              <div className="product-cell image">
              <img src={item.images.url} alt={item.images.url} />
              <span>{item.title}</span>
              </div>
              <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">{orderItem.status}</span>
              </div>
              <div className="product-cell sales">
              <span className="cell-label">Sales:</span>
              {item.quantity}
              </div>
              <div className="product-cell stock">
              <span className="cell-label">Stock:</span>
              {item.band}
              </div>
              <div className="product-cell price">
              <span className="cell-label">Price:</span>
              {item.price} USD
              </div>
          </div>
          </Link>
        ))}
        <span>
        <b>Total:</b> {orderItem.total}
        </span>
    </>
  )
}

export default OrderCancel