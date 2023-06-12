import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import StarRatings from 'react-star-ratings';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import moment from 'moment';

function ProductDetailHeader( detailProduct ) {
  var isInStock = true;
  var ratingCommentNumber = 2
  var ratingStars = 2;

  const [count, setCount] = useState(1);
  const state = useContext(GlobalState);
  const [bands] = state.BandAPI.bands;
  const [isLogged] = state.userAPI.isLogged;
  const product = detailProduct.detailProduct;
  const addCart = state.userAPI.addCart
  const idProduct = product._id;
  const [band,setBand] = useState();
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
    if(product && bands){
      bands.forEach((item)=>{
        if(item._id === product.band){
          setBand(item);
        }
      })
    }
  },[product,bands]);
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
          <img src={band ? band.logo.url : ""} alt="product-img" />
          <h3 className="product-name">{product.title}</h3>
          <div className="product-price" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <h4 className="product-price">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </h4>
            {product && product.discountPercentage ? 
              <div className='coupon-save'>
                <div>
                  RRP : <span style={{ textDecoration: 'line-through' }}>{((product.price) / (1 - (product.discountPercentage / 100))).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}</span>
                </div>
                <span>You save : {product.discountPercentage}%</span>
              </div> : null
            }
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
          {product.amount > 0 ? (
            <span className="on-stock stock">In Stock / {product.amount} </span>
          ) : (
            <span className="out-stock stock">Out of Stock</span>
          )}
          <div className="product-color">
            {/* <div className="product-color-item active">
              <img
                src="https://res.cloudinary.com/dkiofoako/image/upload/v1683621887/PBL/13pm-black_jvumvr.jpg"
                alt=""
              />
            </div> */}
            {product.discountPercentage ? 
              <>
            <svg width="20" height="22" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M19.996.004H0V19.87h19.996z"/></defs><g fill="none" fillRule="evenodd"><g transform="translate(0 1.424)"><mask id="b" fill="#fff"><use xlinkHref="#a"/></mask><path d="M18.769 5.164a4.403 4.403 0 01-1.06.8 8.526 8.526 0 01.973 3.974c.001 1.165-.229 2.295-.681 3.358a8.598 8.598 0 01-1.862 2.743 8.678 8.678 0 01-6.141 2.527 8.678 8.678 0 01-6.14-2.527 8.598 8.598 0 01-1.862-2.743 8.527 8.527 0 01-.683-3.359c0-1.165.23-2.295.683-3.358a8.598 8.598 0 011.861-2.743 8.678 8.678 0 016.141-2.527c.435 0 .865.031 1.288.093.076-.444.218-.866.418-1.255a10.131 10.131 0 00-5.598.638 9.968 9.968 0 00-3.178 2.128A9.896 9.896 0 00.786 6.071 9.817 9.817 0 000 9.937c0 1.341.264 2.642.786 3.867a9.897 9.897 0 002.142 3.158 9.992 9.992 0 007.07 2.91 9.992 9.992 0 007.07-2.91 9.897 9.897 0 002.142-3.158 9.817 9.817 0 00.786-3.867 9.817 9.817 0 00-1.227-4.773" fill="#FFD300" mask="url(#b)"/></g><path d="M18.007 3.53a.394.394 0 01-.394.391H16.1v1.504a.394.394 0 01-.788 0V3.92h-1.513a.394.394 0 01-.394-.391c0-.215.177-.392.394-.392h1.513V1.635a.394.394 0 01.788 0v1.503h1.513c.217 0 .394.177.394.392M15.706 0c-1.962 0-3.553 1.58-3.553 3.53 0 1.95 1.59 3.53 3.553 3.53 1.962 0 3.553-1.58 3.553-3.53 0-1.95-1.591-3.53-3.553-3.53" fill="#E2B90E"/><path d="M15.651 11.361l-.278 2.247h-1.13l-1.89-2.996-.303 2.438a.655.655 0 01-.634.558c-.021 0-.042-.004-.062-.007v.007h-.503l.069-.558.209-1.689.277-2.247h1.131l1.891 2.996.06-.485.157-1.271.085-.682a.656.656 0 01.634-.558l.01.001h.555l-.069.557-.209 1.689zm-4.879-1.69l-.208 1.69-.278 2.247h-1.13l-1.892-2.996-.301 2.438a.656.656 0 01-.634.558c-.022 0-.042-.004-.063-.007v.007h-.503l.07-.558.208-1.689.278-2.247h1.13L9.34 12.11l.06-.485.157-1.271.085-.682a.656.656 0 01.634-.558l.01.001h.555l-.069.557zm-5.087 0l-.418 3.38a.656.656 0 01-.634.557c-.01 0-.017-.002-.026-.003v.003h-.54l.07-.558.176-1.425.157-1.271.084-.682a.656.656 0 01.634-.558l.01.001h.556l-.07.557zm9.93-1.756c-2.36 0-4.286-1.852-4.385-4.173a7.871 7.871 0 00-1.232-.097c-4.289 0-7.766 3.455-7.766 7.716s3.477 7.716 7.766 7.716c4.29 0 7.766-3.455 7.766-7.716 0-1.31-.329-2.543-.908-3.623-.393.115-.81.177-1.24.177z" fill="#FFD300"/></g></svg>Buy now and receive it between : <strong>{moment(product.discountExpiration).format('DD/MM/YYYY')}</strong>
              </> : <>
            <svg width="20" height="22" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M19.996.004H0V19.87h19.996z"/></defs><g fill="none" fillRule="evenodd"><g transform="translate(0 1.424)"><mask id="b" fill="#fff"><use xlinkHref="#a"/></mask><path d="M18.769 5.164a4.403 4.403 0 01-1.06.8 8.526 8.526 0 01.973 3.974c.001 1.165-.229 2.295-.681 3.358a8.598 8.598 0 01-1.862 2.743 8.678 8.678 0 01-6.141 2.527 8.678 8.678 0 01-6.14-2.527 8.598 8.598 0 01-1.862-2.743 8.527 8.527 0 01-.683-3.359c0-1.165.23-2.295.683-3.358a8.598 8.598 0 011.861-2.743 8.678 8.678 0 016.141-2.527c.435 0 .865.031 1.288.093.076-.444.218-.866.418-1.255a10.131 10.131 0 00-5.598.638 9.968 9.968 0 00-3.178 2.128A9.896 9.896 0 00.786 6.071 9.817 9.817 0 000 9.937c0 1.341.264 2.642.786 3.867a9.897 9.897 0 002.142 3.158 9.992 9.992 0 007.07 2.91 9.992 9.992 0 007.07-2.91 9.897 9.897 0 002.142-3.158 9.817 9.817 0 00.786-3.867 9.817 9.817 0 00-1.227-4.773" fill="#FFD300" mask="url(#b)"/></g><path d="M18.007 3.53a.394.394 0 01-.394.391H16.1v1.504a.394.394 0 01-.788 0V3.92h-1.513a.394.394 0 01-.394-.391c0-.215.177-.392.394-.392h1.513V1.635a.394.394 0 01.788 0v1.503h1.513c.217 0 .394.177.394.392M15.706 0c-1.962 0-3.553 1.58-3.553 3.53 0 1.95 1.59 3.53 3.553 3.53 1.962 0 3.553-1.58 3.553-3.53 0-1.95-1.591-3.53-3.553-3.53" fill="#E2B90E"/><path d="M15.651 11.361l-.278 2.247h-1.13l-1.89-2.996-.303 2.438a.655.655 0 01-.634.558c-.021 0-.042-.004-.062-.007v.007h-.503l.069-.558.209-1.689.277-2.247h1.131l1.891 2.996.06-.485.157-1.271.085-.682a.656.656 0 01.634-.558l.01.001h.555l-.069.557-.209 1.689zm-4.879-1.69l-.208 1.69-.278 2.247h-1.13l-1.892-2.996-.301 2.438a.656.656 0 01-.634.558c-.022 0-.042-.004-.063-.007v.007h-.503l.07-.558.208-1.689.278-2.247h1.13L9.34 12.11l.06-.485.157-1.271.085-.682a.656.656 0 01.634-.558l.01.001h.555l-.069.557zm-5.087 0l-.418 3.38a.656.656 0 01-.634.557c-.01 0-.017-.002-.026-.003v.003h-.54l.07-.558.176-1.425.157-1.271.084-.682a.656.656 0 01.634-.558l.01.001h.556l-.07.557zm9.93-1.756c-2.36 0-4.286-1.852-4.385-4.173a7.871 7.871 0 00-1.232-.097c-4.289 0-7.766 3.455-7.766 7.716s3.477 7.716 7.766 7.716c4.29 0 7.766-3.455 7.766-7.716 0-1.31-.329-2.543-.908-3.623-.393.115-.81.177-1.24.177z" fill="#FFD300"/></g></svg>Buy now and receive it!
              </>
            }
          </div>
            <Link
              to={isLogged ? "/order-summary" : "/sign-in"}
              className="btn btn--animated btn--primary--blue btn--border--blue"
              onClick={() => addCart(product,count)}
            >
              Add to Cart
            </Link>
        </div>
      </div>
    </>
  );
}

export default ProductDetailHeader