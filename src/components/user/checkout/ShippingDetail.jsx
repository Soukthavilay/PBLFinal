import { useContext, useState } from 'react'
import StepTracker from './StepTracker'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

function ShippingDetail() {
  const state = useContext(GlobalState)
  const [userDetail] = state.userAPI.detail
  const id = userDetail._id;
  const name = userDetail.name;
  const email = userDetail.email; 
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/createOrder',
      { phone:phone,
        address:address,
        user_id:id});

        window.location.href = "/checkout-confirm";
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  function selectPayment(e) {
    handleToggle();
    console.log(e.target.value)
  }

  const [showHideComment, setShowHidePaymentMethod] = useState(false);
  const handleToggle = () => {
    setShowHidePaymentMethod(!showHideComment);
  };

  return (
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
              // onChange={selectPayment}
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
  );
}

export default ShippingDetail