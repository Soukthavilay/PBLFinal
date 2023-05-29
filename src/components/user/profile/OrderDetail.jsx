import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { GlobalState } from "../../../GlobalState";
import ProfileOption from "./ProfileOption";
import "../../utils/scss/profile.scss";
import Review from "../review/Review";

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [myOrder] = state.userAPI.order;
  const param = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const foundOrder = myOrder.find((order) => order._id === param.id);
    if (foundOrder) {
      setData(foundOrder);
    } else {
      console.log("No match found");
    }
  }, [myOrder, param.id]);

  return (
    <div className="profile">
      <ProfileOption />
      <div className="profile-content order-details">
        <h2>Order details</h2>

        <div className="order-details-content">
          <div className="order-details-header">
            <div className="order-header-item">
              Your package is preparing...
            </div>
            <div className="order-header-item order-status">{}</div>
          </div>
          <div className="order-details-body">
            <div className="order-details-body_product">
              {data &&
                data.listOrderItems?.map((orderItem) => (
                  <div className="order-product" key={orderItem._id}>
                    <div className="order-product-info">
                      <img
                        src={orderItem.images.url}
                        alt={
                          orderItem.images.url
                            ? `${orderItem.images.url}`
                            : "product-image"
                        }
                      />
                      <div className="order-product-info_detail">
                        <h3 className="product-name">{orderItem.title}</h3>
                        <span className="product-type">
                          {orderItem.feature.color}
                        </span>
                      </div>
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
                    <div className="order-product-review">
                      <Popup
                        trigger={<button className="review-btn">Review</button>}
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal review-modal">
                            <button className="close" onClick={close}>&times;</button>
                            <div className="header">Review Product</div>
                            <div className="content">
                              {" "}
                              <Review productID={orderItem._id}/>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                ))}
            </div>
            {data ? (
              <>
                <div className="order-details-info">
                  <span className="order-details-info_code">
                    Order: #{data._id}
                  </span>
                  <span className="order-details-info_date">
                    Placed on {new Date(data.createdAt).toLocaleDateString()}
                  </span>
                  <span className="order-details-info_method">{data.paymentMethod ? data.paymentMethod : ""}</span>
                </div>
                <div className="order-details-summary">
                  <div className="order-details-summary_item order-summary-user">
                    <p className="name">{data.name}</p>
                    <p className="address">{data.address}</p>
                    <p className="phone">{data.phone}</p>
                  </div>
                  <div className="order-details-summary_item order-summary-price">
                    <h2>Total Summary</h2>
                    <div className="order-summary-price_item">
                      <span className="order-summary-price_item-left">
                        Subtotal ({data.listOrderItems.length})
                      </span>
                      <span className="order-summary-price_item-right">
                        {data.total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                    <div className="order-summary-price_item">
                      <span className="order-summary-price_item-left">
                        Shipping Fee
                      </span>
                      <span className="order-summary-price_item-right">
                        {data.shippingFee ? data.shippingFee : 0} USD
                      </span>
                    </div>
                    <div className="order-summary-price_item total">
                      <span className="order-summary-price_item-left">
                        Total
                      </span>
                      <span className="order-summary-price_item-right">
                        {data.total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                    <span className="order-summary-price_method">
                      Ship {data.paymentMethod ? data.paymentMethod : ""}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>User data is missing</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
