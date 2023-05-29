import React from 'react'
import { RiTruckLine } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { AiOutlineGift } from "react-icons/ai";
import { RiCustomerService2Line } from "react-icons/ri";

function ServiceList() {
  return (
    <div className="service-list">
      <div className="service-list-item">
        <div className="service-list-item_img">
          <RiTruckLine />
        </div>
        <div className="service-list-item_content">
          <h3>Low cost delivery</h3>
          <span>From 20,000 VND</span>
        </div>
      </div>
      <div className="service-list-item">
        <div className="service-list-item_img">
          <BsCashStack />
        </div>
        <div className="service-list-item_content">
          <h3>Cash on delivery</h3>
          <span>Order first pay later</span>
        </div>
      </div>
      <div className="service-list-item">
        <div className="service-list-item_img">
          <AiOutlineGift />
        </div>
        <div className="service-list-item_content">
          <h3>Free Gift Box</h3>
          <span>Select gift box free</span>
        </div>
      </div>
      <div className="service-list-item">
        <div className="service-list-item_img">
          <RiCustomerService2Line />
        </div>
        <div className="service-list-item_content">
          <h3>24/7</h3>
          <span>Contact if you want</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceList