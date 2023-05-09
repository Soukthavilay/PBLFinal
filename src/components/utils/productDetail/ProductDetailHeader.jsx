import React from 'react';
import StarRatings from 'react-star-ratings';

function ProductDetailHeader() {
  var price = 27000000;
  var color = "Red";
  var isInStock = false;
  var ratingCommentNumber = 2
  var ratingStars = 2;
  return (
    <>
      <div className="detail-header">
        <div className="detail-header-left">
          <img
            src="https://res.cloudinary.com/dkiofoako/image/upload/v1683621887/PBL/13pm-black_jvumvr.jpg"
            alt=""
          />
        </div>
        <div className="detail-header-right">
          <h3 className="product-name">Apple iPhone 14 128GB 6.1</h3>
          <div className="product-price">
            <h4 className="product-price">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
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
            <button className="quantity-btn">-</button>
            <input type="number" value={0} />
            <button className="quantity-btn">+</button>
          </div>
          <p className="product-color-main">Color: {color}</p>
          {isInStock ? (
            <span className="on-stock stock">In Stock</span>
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
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetailHeader