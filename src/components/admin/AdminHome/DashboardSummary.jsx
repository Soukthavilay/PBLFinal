import React, { useEffect, useState } from 'react';;
import axios from 'axios';
import { PiShoppingBag } from "react-icons/pi";

function DashboardSummary() {

  const [totalSales, setTotalSales] = useState(0);
  const [soldProducts, setSoldProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  var price = 2000000;


  const fetchStatistics = async () => {
    try {
      const salesResponse = await axios('http://localhost:5000/api/statistics/sales');
      const salesData = salesResponse.data;
      setTotalSales(salesData.totalSales);
      setSoldProducts(salesData.soldProducts);

      const revenueResponse = await axios('http://localhost:5000/api/statistics/revenue');
      const revenueData = revenueResponse.data;
      setTotalRevenue(revenueData.totalRevenue);
      setDeliveredOrders(revenueData.deliveredOrders);

      const newUserResponse = await axios('http://localhost:5000/api/statistics/newUser');
      const newUserData = newUserResponse.data;
      setNewUsers(newUserData);

      const statisticsCateResponse = await axios('http://localhost:5000/api/statistics/cate');
      const statisticsCateData = statisticsCateResponse.data;
      setCategoryStats(statisticsCateData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='dashboard-summary'>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <PiShoppingBag />
            <h2>Total Sales</h2>
          </div>
          <p>{totalSales} <small>items</small></p>
        </div>
      </div>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <PiShoppingBag />
            <h2>Revenue</h2>
          </div>
          <p>{price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",})} </p>
        </div>
      </div>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <PiShoppingBag />
            <h2>Total User</h2>
          </div>
          <p>{totalSales} <small>user</small></p>
        </div>
      </div>
      <div className="dashboard-summary-item">
        <div className="item-content">
          <div className="title">
            <PiShoppingBag />
            <h2>Total Orders</h2>
          </div>
          <p>{totalSales} <small>orders</small></p>
        </div>
      </div>
    </div>
  )
}

export default DashboardSummary