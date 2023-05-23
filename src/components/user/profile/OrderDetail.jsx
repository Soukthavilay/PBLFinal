import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProfileOption from "./ProfileOption";
import ip14 from "../../../assets/ip14.jpg";
import "../../utils/scss/profile.scss";

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
  console.log(data);
  // console.log(data.status)

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
            <div className="order-header-item order-status">Pending</div>
          </div>
          <div className="order-details-body">
            {/* {data.listOrderItems?.map((orderItem) => (
              <div className="order-product" key={orderItem._id}>
                <div className="order-product-img">
                  <img
                    src={orderItem.images.url}
                    alt={
                      orderItem.images.url
                        ? `${orderItem.images.url}`
                        : "product-image"
                    }
                  />
                </div>
                <div className="order-product-info">
                  <h3 className="product-name">
                    {orderItem.title}
                  </h3>
                  <span className="product-type">
                    {orderItem.feature.color}
                  </span>
                </div>
                <div className="order-product-price">{orderItem.price} USD</div>
                <div className="order-product-quantity">
                  Qty: {orderItem.quantity}
                </div>
              </div>
            ))} */}
            <div className="order-details-body_product">
              <div className="order-product">
                <div className="order-product-info">
                  <img src={ip14} alt="" />
                  <div className="order-product-info_detail">
                    <h3 className="product-name">
                      iPhone 14 Pro Max sieu cap vippasdasdro asdasd asdasdasd
                    </h3>
                    <span className="product-type">Purple</span>
                  </div>
                </div>
                <div className="order-product-price">200000000 KIP</div>
                <div className="order-product-quantity">Qty: 1</div>
              </div>
              <div className="order-product">
                <div className="order-product-info">
                  <img src={ip14} alt="" />
                  <div className="order-product-info_detail">
                    <h3 className="product-name">
                      iPhone 14 Pro Max sieu cap vipdasdspro asdasdasd
                    </h3>
                    <span className="product-type">Purple</span>
                  </div>
                </div>
                <div className="order-product-price">200000000 KIP</div>
                <div className="order-product-quantity">Qty: 1</div>
              </div>
            </div>
            <div className="order-details-info">
              <span className="order-details-info_code">Order: #123123</span>
              <span className="order-details-info_date">
                Placed on 07 May 2023 18:37:28
              </span>
              <span className="order-details-info_method">Ship COD</span>
            </div>
            <div className="order-details-summary">
              <div className="order-details-summary_item order-summary-user">
                <p className="name">Koh Koh</p>
                <p className="address">123 ABC LAO</p>
                <p className="phone">0123123123</p>
              </div>
              <div className="order-details-summary_item order-summary-price">
                <h2>Total Summary</h2>
                <div className="order-summary-price_item">
                  <span className="order-summary-price_item-left">
                    Subtotal (1 Items)
                  </span>
                  <span className="order-summary-price_item-right">
                    123,000 KIP
                  </span>
                </div>
                <div className="order-summary-price_item">
                  <span className="order-summary-price_item-left">
                    Shipping Fee
                  </span>
                  <span className="order-summary-price_item-right">
                    20,000 KIP
                  </span>
                </div>
                <div className="order-summary-price_item total">
                  <span className="order-summary-price_item-left">Total</span>
                  <span className="order-summary-price_item-right">
                    143,000 KIP
                  </span>
                </div>
                <span className="order-summary-price_method">Ship COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
