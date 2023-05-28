import { useContext, useEffect, useState } from "react";
import OrderHeader from "./OrderHeader"
import { GlobalState } from "../../../GlobalState";

const OrderShow = (orders) => {
  const order = orders.orders;
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [newNameCate,setNewNameCate] = useState();

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }
    categories.map((item) => {
      if (item._id === order.listOrderItems[0]?.category) {
        setNewNameCate(item.name);
      }
    });
  }, [categories, order]);
  return (
    <>
      <OrderHeader key={order._id} order={order}/>
      <div className="products-header">
            <div className="product-cell image">
                Item
            </div>
            <div className="product-cell category">
                Category
            </div>
            <div className="product-cell status-cell">
                Status
            </div>
            <div className="product-cell sales">
                Quantity
            </div>
            <div className="product-cell stock">
                Band
            </div>
            <div className="product-cell price">
                Price
            </div>
        </div>
      {order.listOrderItems.map((item) =>(
            <div key={item._id} className="products-row">
                    <div className="product-cell image">
                    <img src={item.images.url} alt={item.images.url}/>
                    <span>{item.title}</span>
                    </div>
                <div className="product-cell category"><span className="cell-label">Category:</span>{newNameCate ? newNameCate: item.category}</div>
                <div className="product-cell status-cell">
                    <span className="cell-label">Status:</span>
                    <span className="status active">{order.status}</span>
                </div>
                <div className="product-cell sales"><span className="cell-label">Sales:</span>{item.quantity}</div>
                <div className="product-cell stock"><span className="cell-label">Stock:</span>{item.band}</div>
                <div className="product-cell price"><span className="cell-label">Price:</span>{item.price} USD</div>
            </div>
        ))}
      <span>Total : {order.total}</span>
    </>
  )
}

export default OrderShow