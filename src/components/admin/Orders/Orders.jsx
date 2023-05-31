import { GlobalState } from '../../../GlobalState';
import '../scss/createProduct.scss'
import { useContext, useEffect } from 'react';
import axios from 'axios';
import OrderShow from './OrderShow';
import Loading from '../../utils/Loading/Loading';
import { useState } from 'react';

const Orders = () => {
    const state = useContext(GlobalState);
    const [order,setOrder] = state.userAPI.history;
    const [token] = state.token;
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
      if (token){
        const getOrder = async () =>{
          setLoading(true);
          const res = await axios.get('http://localhost:5000/api/orders/admin', {
            headers: { Authorization: token },
          });
          setLoading(false);
          setOrder(res.data.orders);
        }
        getOrder();
      }
    },[token,setOrder]);

    return (
      <>
      {loading ? <Loading/> : 
        <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">All Order</h1>
        </div>
        <div className="app-content-actions">
          <input type="text" className="search-bar" />
        </div>
        <div className="product-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell image">Item</div>
            <div className="product-cell category">Category</div>
            <div className="product-cell status-cell">Status</div>
            <div className="product-cell sales">Quantity</div>
            <div className="product-cell stock">Band</div>
            <div className="product-cell price">Price</div>
          </div>
          {order.map((orderItem)=>{
            return <OrderShow key={orderItem._id} orders={orderItem}/>
          })}
        </div>
      </div>
      }
      </>
    );
}

export default Orders