import React from 'react'
import "../../utils/scss/product-list.scss";
import StarRatings from "react-star-ratings";
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

function ProductList() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;

  var userStar = 5;
  return (
    <div className="product-list">
      <h2>Product list</h2>

      <div className="product-list-items">
        {products &&
          products.map((item) => {
            const { _id, title, images, price, sold } = item;
            // console.log(item);
            return (
              <div className="product-item">
                <div className="product-item-image">
                  <Link to={`/detail/${_id}`}>
                    <img src={images.url} alt={images.url} />
                  </Link>
                </div>
                <div className="product-item-detail">
                  <h3 className="product-name">
                    <Link to={`/detail/${_id}`}>{title}</Link>
                  </h3>
                  <div className="product-detail">
                    <div className="product-detail-meta">
                      <p className="product-price">
                        {new Intl.NumberFormat("vi-LA", {
                          style: "currency",
                          currency: "KIP",
                        }).format(price)}
                      </p>
                      <div className="product-ratings">
                        <StarRatings
                          name="rating"
                          rating={userStar}
                          starRatedColor="#fadb14"
                          starDimension="16px"
                          starSpacing="2px"
                        />
                        <span>({sold})</span>
                      </div>
                    </div>
                    <Link
                      to={`/detail/${_id}`}
                      className="btn btn--animated btn--primary--white btn--border--blue"
                    >
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductList