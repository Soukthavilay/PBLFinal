import { GlobalState } from '../../../GlobalState';
import '../scss/createProduct.scss'
import { useContext, useEffect } from 'react';
import axios from 'axios';
import OrderShow from './OrderShow';

const Orders = () => {
    const state = useContext(GlobalState);
    const [order,setOrder] = state.userAPI.history;
    const [token] = state.token;

    useEffect(()=>{
      if (token){
        const getOrder = async () =>{
          const res = await axios.get('http://localhost:5000/api/orders/admin', {
            headers: { Authorization: token },
          });
          setOrder(res.data.orders);
        }
        getOrder();
      }
    },[token,setOrder]);

    return (
      <>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">All Order</h1>
          </div>
          <div className="app-content-actions">
            <input type="text" className="search-bar" />
          </div>
          <div className="product-area-wrapper tableView">
            {order.map((orderItem)=>{
              return <OrderShow key={orderItem._id} orders={orderItem}/>
            })}
          </div>
        </div>
      </>
    );
}

export default Orders