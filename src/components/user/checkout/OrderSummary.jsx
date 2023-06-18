import { useState, useContext, useEffect } from 'react'
import StepTracker from './StepTracker';
import { GlobalState } from "../../../GlobalState"
import axios from "axios"
import { Link } from 'react-router-dom';

function OrderSummary() {
  const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])
    const addToCart = async (cart) => {
        await axios.patch(
            'http://localhost:5000/user/addcart',
            { cart },
            {
                headers: { Authorization: token },
            }
        );
    };

    const increment = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity += 1;
            } 
        });
        setCart([...cart]);
        addToCart(cart);
    };

    const decrement = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
            }
        });
    
        setCart([...cart]);
        addToCart(cart);
    };

    const removeItem = (id) => {
      const newCart = cart.filter((item) => item._id !== id);
      setCart(newCart);
      addToCart(newCart);
    };
  return (
    <div className="order-summary">
      <StepTracker current={1} />
      <h2 className="order-summary-title">Cart Information</h2>
      {total ? <>
        <p className="order-summary-subtitle">Check the products in your cart</p>

      <div className="order-summary-product">
        {cart.map((item) => {
          return (
            <div className="order-product-item" key={item._id}>
              <div className="product-image">
                <img src={item.images.url} alt={item.images.url} />
                <div className="product-name">
                  <h3>{item.title}</h3>
                </div>
              </div>
              <div className="product-detail-quantity">
                <div className="product-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => decrement(item._id)}
                  >
                    -
                  </button>
                  <input type="number" readOnly value={item.quantity} />
                  <button
                    className="quantity-btn"
                    onClick={() => increment(item._id)}
                  >
                    +
                  </button>
                </div>
                <div className="product-remove">
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="product-detail-price">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 3,
                }).format(item.price * item.quantity)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="total">
        <b>Total</b>: &nbsp;
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 3,
        }).format(total)}
      </div>

      <div className="checkout-buttons">
        <button className="btn btn--animated btn--primary--blue btn--border--blue">
          <Link to='/'>Continue to product</Link>
        </button>
        <button className="btn btn--animated btn--primary--white btn--border--blue">
          <Link to="/shipping-detail">NEXT</Link>
        </button>
      </div>
      </> : <>
        <div className="cart-no-have">
          <h2 className='order-summary-title'>Not have product select</h2>
          <button className="btn btn--animated btn--primary--white btn--border--blue">
            <Link to="/">Continues to Shop</Link>
          </button>
        </div>
      </>}
    </div>
  );
}

export default OrderSummary