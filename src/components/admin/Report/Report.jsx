import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import OrderCancel from './OrderCancel';

const Report = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [order,setOrder] = useState([]);
  useEffect(()=>{
    if (token){
      const getOrder = async () =>{
        const res = await axios.get('http://localhost:5000/api/order/cancel-request', {
          headers: { Authorization: token },
        });
        setOrder(res.data);
      }
      getOrder();
    }
  },[token,setOrder]);

  return (
    <>
      <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">All Order Cancel request</h1>
        </div>
        <div className="app-content-actions">
          <input type="text" className="search-bar" />
        </div>
        <div className="product-area-wrapper tableView">
          {order?.map((orderItem)=>{
            return <OrderCancel key={orderItem._id} orders={orderItem}/>
          })}
        </div>
      </div>
    </>
  )
}

export default Report