import React, { useEffect, useState } from 'react'
import '../scss/adminDash.scss'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineSearch } from "react-icons/ai";

const Home = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [soldProducts, setSoldProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const fetchData = () => {
    // Gửi yêu cầu API với tháng và năm đã chọn
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    // Tiếp tục xử lý yêu cầu API và hiển thị dữ liệu
  };
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
    <>
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className="dashboard-search">
          {/* <h2 style={{color: + "red"}}>Select Month and Year</h2> */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/yyyy"
            placeholderText={'Select Month and Year'}
            showMonthYearPicker
          />
          <button className="search-btn" onClick={fetchData}><AiOutlineSearch /></button>
        </div>

        <div className="dashboard-summary">
          <div className='statistical-card'>
            <h2>Total Sales</h2>
            <p>{totalSales} <small>items</small></p>
          </div>
          <div className='statistical-card'>
            <h2>Total Revenue</h2>
            <p>{totalRevenue} $</p>
          </div>
          <div className='statistical-card'>
            <h2>New Users</h2>
            <ul>
              {newUsers.map((user) => (
                <li key={user._id}>- {user.name}</li>
              ))}
            </ul>
          </div>
          <div className='statistical-card'>
            <h2>Delivered Orders</h2>
            <ul>
              {deliveredOrders.map((order) => (
                <li key={order._id}>{order.orderNumber}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='statistical-card sold-product'>
          <h2>Sold Products</h2>
          <ul>
            {soldProducts.map((product) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        </div>

        <div className='statistical-card statistics'>
          <h2>Category Statistics</h2>
          <ul>
            {categoryStats.map((category) => (
              <li key={category._id}>{category._id}: {category.totalProducts}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home