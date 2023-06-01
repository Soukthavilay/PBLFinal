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
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedOrders, setSortedOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusOrder, setStatusOrder] = useState('');

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

    const handleSortOrder = () => {
      const sorted = [...order].sort((a, b) => {
        // Sắp xếp theo createdAt (ngày tạo đơn hàng)
        if (sortOrder === 'asc') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
      setSortedOrders(sorted);
    };

    const handleSearch = () => {
      const filteredOrders = order.filter((orderItem) =>
        orderItem.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSortedOrders(filteredOrders);
    };

    const handleSortByStatus = (status) => {
      const filteredOrders = order.filter((orderItem) => orderItem.status === status);
      setSortedOrders(filteredOrders);
      setStatusOrder(status);
    };
    useEffect(() => {
      handleSortOrder();
    }, [order, sortOrder]);

    return (
      <>
      {loading ? <Loading/> : 
        <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">All Order</h1>
        </div>
        <div className="app-content-actions">
            <input
              type="text"
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by user..."
            />
            <button className="app-content-headerButton button" onClick={handleSearch}>
              Search
            </button>
          <select
              className="sort-order app-content-headerButton button"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
        </div>
        <div className="product-area-wrapper tableView">
        <div className="products-header">
              <div
                className="product-cell image header-status"
                onClick={() => handleSortByStatus('Cancelled')}
              >
                Order cancelled
              </div>
              {/* <div
                className="product-cell category header-status"
                onClick={() => handleSortByStatus('Cancel Requested')}
              >
                Order request cancel
              </div> */}
              <div
                className="product-cell status-cell header-status"
                onClick={() => handleSortByStatus('Pending')}
              >
                Order Pending
              </div>
              <div
                className="product-cell status-cell header-status"
                onClick={() => handleSortByStatus('Confirmed')}
              >
                Order Confirmed
              </div>
              <div className="product-cell sales header-status" onClick={() => handleSortByStatus('Paid')}>
                Paid
              </div>
              <div
                className="product-cell stock header-status"
                onClick={() => handleSortByStatus('Shipping')}
              >
                Shipping
              </div>
              <div
                className="product-cell price header-status"
                onClick={() => handleSortByStatus('Delivered')}
              >
                Delivered
              </div>
            </div>
          <hr/>
          <div className="products-header">
            <div className="product-cell image">Item</div>
            <div className="product-cell category">Category</div>
            <div className="product-cell status-cell">Status</div>
            <div className="product-cell sales">Quantity</div>
            <div className="product-cell stock">Band</div>
            <div className="product-cell price">Price</div>
          </div>
          {sortedOrders.map((orderItem)=>{
            return <OrderShow key={orderItem._id} orders={orderItem}/>
          })}
        </div>
      </div>
      }
      </>
    );
}

export default Orders