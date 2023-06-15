import { useContext, useEffect, useState } from 'react'
import Popup from "reactjs-popup";
import StepTracker from './StepTracker'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Loading from '../../utils/Loading/Loading';
import moment from 'moment';
import { Link } from 'react-router-dom';


function ShippingDetail() {
  const state = useContext(GlobalState)
  const [token] = state.token;
  const [userDetail] = state.userAPI.detail;
  const [cart, setCart] = state.userAPI.cart;
  const id = userDetail._id;
  const name = userDetail.name;
  const email = userDetail.email; 
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [voucher,setVoucher] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [itemOrder,setItemOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [hasVoucher, setHasVoucher] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [showVoucherPopup, setShowVoucherPopup] = useState(false);
  const [total, setTotal] = useState(0);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedPaymentMethod === 'cod') {
    try {
      setLoading(true);
      let requestBody = {
        phone: phone,
        address: address,
        user_id: id
      };
      if (voucher) {
        requestBody.voucherCode = voucher;
      }
      await axios.post('http://localhost:5000/api/createOrder',requestBody);

      window.location.href = "/checkout-confirm";
    } catch (error) {
      alert(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  } else if (selectedPaymentMethod === 'paypal') {
    try {
      setLoading(true);
      let requestBody = {
        phone: phone,
        address: address,
        user_id: id
      };
      if (voucher) {
        requestBody.voucherCode = voucher;
      }
      const res = await axios.post('http://localhost:5000/api/createOrder',requestBody);
      setItemOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  }
};

useEffect(() => {
  if (itemOrder && itemOrder.order?.listOrderItems?.length > 0) {
    const orderNow = {
      order_id: itemOrder.order._id,
    };
    axios.post('http://localhost:5000/api/paypal', { ...orderNow })
      .then(response => {
        window.open(response.data.url, '_blank');
        window.location.href = "/checkout-confirm";
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }).finally(() =>{
        setLoading(false);
      });
  }
}, [itemOrder]);

  function selectPayment(e) {
    handleToggle();
  }

  const [showHideComment, setShowHidePaymentMethod] = useState(false);
  const handleToggle = () => {
    setShowHidePaymentMethod(!showHideComment);
  };

  useEffect(() => {
    if(token){
      const fetchVouchers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/voucher',{headers: { Authorization: token }});
          setVouchers(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    fetchVouchers();
    }
  }, [token]);
  const handleVoucherSelection = (selectedVoucher) => {
    setVoucher(selectedVoucher);
  };
  const handleVoucherPopupOpen = () => {
    setShowVoucherPopup(true);
  };
  const handleVoucherPopupClose = () => {
    setShowVoucherPopup(false);
  };
  useEffect(() => {
    if (cart) {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
    }
  }, [cart]);
  return (
    <>
      {loading ? <>{loading && <Loading/>}</> : <>
      <div className="shipping-detail">
      <StepTracker current={2} />
      <h3 className="shipping-detail-title">Shipping Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="shipping-detail-form">
          <div className="form-group">
            <label htmlFor="fullname">First Name && Last Name</label>
            <input type="text" name="fullname" placeholder="First Name && Last Name" value={name} readOnly/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} readOnly/>
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone number</label>
            <input required type="number" name="phonenumber" value={phone}  onChange={e => setPhone(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input required name="address" type="text" value={address}  onChange={e => setAddress(e.target.value)}/>
          </div>
          <div className='form-group'>
            <label htmlFor="voucher">Voucher</label>
            {voucher ? <input
              name="voucher"
              type="text"
              value={voucher ? voucher : ""}
              readOnly
            /> : <></>}
            <Popup
            trigger={<a className="button btn btn--animated btn--primary--blue btn--border--blue">Select Voucher</a>}
            modal
            nested
            open={showVoucherPopup} onClose={handleVoucherPopupClose}
          >
            {(close) => (
              <div className="modal review-modal">
                <button className="close" onClick={close}>&times;</button>
                <div className="voucher-popup">
                <h4>Select a Voucher</h4>
                <ul>
                  {vouchers.map((voucher) => (
                    <li key={voucher._id}>
                      <div>
                        <strong>{voucher.code}</strong>
                        <p>{voucher.description}</p>
                        <p>{voucher.conditions}</p>
                        <p><strong>Expiration date:</strong> {moment(voucher.expirationDate).format('DD/MM/YYYY')}</p>
                        <strong>OFF {voucher.discountPercentage}%</strong>
                        <button className='button' disabled={voucher.priceConditions >= total} onClick={() => handleVoucherSelection(voucher.code)}>Select</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            )}
          </Popup>
          </div>
          {/* <div className="form-group">
            <label htmlFor="has-voucher">
              <input
                type="checkbox"
                id="has-voucher"
                checked={hasVoucher}
                onChange={(e) => setHasVoucher(e.target.checked)}
              />
              
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="voucher">Voucher</label>
            <input
              name="voucher"
              type="text"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              disabled={!hasVoucher}
              onClick={handleVoucherPopupOpen}
            />
          </div> */}
          {/* {showVoucherPopup && (
            <div className="voucher-popup">
              <h4>Select a Voucher</h4>
              <ul>
                {vouchers.map((voucher) => (
                  <li
                    key={voucher._id}
                    onClick={() => handleVoucherSelection(voucher.code)}
                  >
                    {voucher.code}
                  </li>
                ))}
              </ul>
              <button onClick={handleVoucherPopupClose}>Close</button>
            </div>
          )} */}
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
              <Link to='/order-summary'>Back</Link>
            </button>
            <button type='submit' className="btn btn--animated btn--primary--white btn--border--blue">
              Next
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