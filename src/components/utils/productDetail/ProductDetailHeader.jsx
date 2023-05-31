import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import StarRatings from 'react-star-ratings';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

function ProductDetailHeader( detailProduct ) {
  var isInStock = true;
  var ratingCommentNumber = 2
  var ratingStars = 2;

  let [count, setCount] = useState(1);
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const product = detailProduct.detailProduct;
  const addCart = state.userAPI.addCart
  const idProduct = product._id;
  const [feedback,setFeedback] = useState([]);
  const [result,setResult] = useState(0);

  useEffect(()=>{
    if(idProduct){
      const getFeedback = async ()=>{
        try {
          const res = await axios.get(`http://localhost:5000/api/products/${idProduct}`);
          setFeedback(res.data.feedback)
        } catch (error) {
          alert(error.response.data.msg);
        }
      }
      getFeedback();
    }
  },[idProduct]);
  const handleChange = () => {

  }

  useEffect(()=>{
    
    if (feedback && feedback.length){
      var total = 0;
      feedback?.map((FeedbackItem)=>{
        total += FeedbackItem.rating;
      })
      setResult(total / feedback.length);
    }
  },[feedback]);
  return (
    <>
      <div className="detail-header">
        <div className="detail-header-left">
          <img src={product.images.url} alt={product.images.url} />
        </div>
        <div className="detail-header-right">
          <h3 className="product-name">{product.title}</h3>
          <div className="product-price">
            <h4 className="product-price">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </h4>
            <div className="product-ratings">
              <StarRatings
                name="rating"
                rating={result}
                starRatedColor="#fadb14"
                starDimension="16px"
                starSpacing="2px"
              />
              <span className="number-comments">({feedback.length})</span>
            </div>
          </div>
          <div className="product-quantity">
            <button
              className="quantity-btn"
              onClick={() => setCount((c) => Math.max(c - 1, 0))}
            >
              -
            </button>
            <input type="number" value={count} onChange={handleChange} />
            <button
              className="quantity-btn"
              onClick={() => setCount((c) => c + 1)}
            >
              +
            </button>
          </div>
          <p className="product-color-main">Color: {product.feature.color}</p>
          {isInStock ? (
            <span className="on-stock stock">In Stock / {product.amount} </span>
          ) : (
            <span className="out-stock stock">Out of Stock</span>
          )}
          <div className="product-color">
            <div className="product-color-item active">
              <img
                src="https://res.cloudinary.com/dkiofoako/image/upload/v1683621887/PBL/13pm-black_jvumvr.jpg"
                alt=""
              />
            </div>
            <div className="product-color-item">
              <img
                src="https://res.cloudinary.com/dkiofoako/image/upload/v1683621887/PBL/13pm-blue_qgziw6.jpg"
                alt=""
              />
            </div>
            <div className="product-color-item">
              <img
                src="https://res.cloudinary.com/dkiofoako/image/upload/v1683621886/PBL/13pm-green_acxyvi.jpg"
                alt=""
              />
            </div>
          </div>
            <Link
              to={isLogged ? "/order-summary" : "/sign-in"}
              className="btn btn--animated btn--primary--blue btn--border--blue"
              onClick={() => addCart(product)}
            >
              Add to Cart
            </Link>
        </div>
      </div>
    </>
  );
}

export default ProductDetailHeader