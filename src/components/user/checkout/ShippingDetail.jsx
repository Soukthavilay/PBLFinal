import { useContext, useEffect, useState } from 'react'
import StepTracker from './StepTracker'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Loading from '../../utils/Loading/Loading';

function ShippingDetail() {
  const state = useContext(GlobalState)
  const [userDetail] = state.userAPI.detail
  const id = userDetail._id;
  const name = userDetail.name;
  const email = userDetail.email; 
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [itemOrder,setItemOrder] = useState();
  const [loading, setLoading] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedPaymentMethod === 'cod') {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/createOrder', {
        phone: phone,
        address: address,
        user_id: id
      });

      window.location.href = "/checkout-confirm";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  } else if (selectedPaymentMethod === 'paypal') {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/createOrder', {
        phone: phone,
        address: address,
        user_id: id
      });
      setItemOrder(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
};

useEffect(() => {
  if (itemOrder && itemOrder.order?.listOrderItems?.length > 0) {
    const orderNow = {
      amount: itemOrder.order.listOrderItems[0].quantity,
      order_id: itemOrder.order._id,
      total: itemOrder.order.total,
      price: itemOrder.order.listOrderItems[0].price
    };
    axios.post('http://localhost:5000/api/paypal', { ...orderNow })
      .then(response => {
        // Xử lý kết quả của API
        console.log(response.data);
        window.open(response.data.url, '_blank');
        window.location.href = "/checkout-confirm";
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.log(error);
      }).finally(() =>{
        setLoading(false);
      });
  }
}, [itemOrder]);

  function selectPayment(e) {
    handleToggle();
    console.log(e.target.value)
  }

  const [showHideComment, setShowHidePaymentMethod] = useState(false);
  const handleToggle = () => {
    setShowHidePaymentMethod(!showHideComment);
  };

  return (
    <>
      {loading ? <>{loading && <Loading/>}</> : <>
      <div className="shipping-detail">
      <StepTracker current={2} />
      <h3 className="shipping-detail-title">Thông tin giao hàng</h3>
      <form onSubmit={handleSubmit}>
        <div className="shipping-detail-form">
          <div className="form-group">
            <label htmlFor="fullname">Họ Tên</label>
            <input type="text" name="fullname" placeholder="Họ và tên" value={name} readOnly/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} readOnly/>
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone number</label>
            <input type="number" name="phonenumber" value={phone}  onChange={e => setPhone(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input name="address" type="text" value={address}  onChange={e => setAddress(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="payment-method">Payment methods</label>
            <select
                name="payment-method"
                id="paymentMethod"
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
            >
                <option value="cod">Ship cod</option>
                <option value="paypal">Paypal</option>
            </select>
        </div>
          <div className="checkout-buttons">
            <button className="btn btn--animated btn--primary--blue btn--border--blue">
              Tiếp tục mua
            </button>
            <button type='submit' className="btn btn--animated btn--primary--white btn--border--blue">
              Tiếp theo
            </button>
          </div>
        </div>
      </form>
    </div>
      </>}
    </>
  );
}

export default ShippingDetail