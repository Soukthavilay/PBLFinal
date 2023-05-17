import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import StarRatings from 'react-star-ratings';
import { GlobalState } from '../../../GlobalState';

function ProductDetailHeader( detailProduct ) {
  var isInStock = true;
  var ratingCommentNumber = 2
  var ratingStars = 2;

  let [count, setCount] = useState(1);
  const state = useContext(GlobalState);
  const product = detailProduct.detailProduct;
  const addCart = state.userAPI.addCart

  const handleChange = () => {

  }
  // console.log(product)

  return (
    <>
      <div className="detail-header">
        <div className="detail-header-left">
          <img
            src={product.images.url}
            alt={product.images.url}
          />
        </div>
        <div className="detail-header-right">
          <h3 className="product-name">{product.title}</h3>
          <div className="product-price">
            <h4 className="product-price">
              {new Intl.NumberFormat("vi-LA", {
                style: "currency",
                currency: "KIP",
              }).format(product.price)}
            </h4>
            <div className="product-ratings">
              <StarRatings
                name="rating"
                rating={ratingStars}
                starRatedColor="#fadb14"
                starDimension="16px"
                starSpacing="2px"
              />
              <span className="number-comments">({ratingCommentNumber})</span>
            </div>
          </div>
          <div className="product-quantity">
            <button
              className="quantity-btn"
              onClick={() => setCount((c) => Math.max(c - 1, 0))}
            >
              -
            </button>
            <input type="number" value={count} onChange={handleChange}/>
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
          <button className="btn btn--animated btn--primary--blue btn--border--blue">
            <Link to="/order-summary" onClick={()=> addCart(product)}>Add to Cart</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetailHeader