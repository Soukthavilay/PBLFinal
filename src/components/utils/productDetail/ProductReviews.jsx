import React from 'react'
import { useState } from 'react';
import StarRatings from "react-star-ratings";
import ProductReviewDetail from './ProductReviewDetail';

function ProductReviews() {
  var totalStar = 0;
  var averageStar = 0;
  var commentList = [1, 2, 3, 4, 5, 6];
  var totalComment = commentList.length;
  if (commentList.length > 0) {
    for (var i = 0; i < commentList.length; i++) {
      totalStar += commentList[i];
    }
    averageStar = totalStar / commentList.length;
  }
  const [showHideComment, setShowHideComment] = useState(false);
  const handleToggle = () => {
    setShowHideComment(!showHideComment);
  };

  const [selectStar, setSelectStar] = useState("");
  const changeRating = (newRating) => {
    setSelectStar({
      rating: newRating,
    });
  };

  return (
    <>
      <div className="product-reviews">
        <h3 className="product-reviews-title">Đánh giá sản phẩm</h3>
        <div className="product-reviews-summary">
          <div className="reviews-summary-item">
            <h4>Đánh giá trung bình</h4>
            <span className="average-star">{averageStar} / 5</span>
            <StarRatings
              name="rating"
              rating={averageStar}
              starRatedColor="#fadb14"
              starDimension="16px"
              starSpacing="2px"
            />
            <span className="total-comment">{totalComment} đánh giá</span>
          </div>
          <div className="reviews-summary-item">
            <p>Bạn đã dùng sản phẩm này?</p>
            <button
              className="btn btn--animated btn--primary--blue btn--border--blue"
              onClick={handleToggle}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>

        <div
          className={
            showHideComment ? "comment-container show" : "comment-container hide"
          }
        >
          <h3>Viết đánh giá sản phẩm</h3>
          <div className="comment-form">
            <input type="text" placeholder="Name" />
            <StarRatings
              name="rating"
              rating={selectStar.rating}
              changeRating={changeRating}
              starHoverColor="#fadb14"
              starRatedColor="#fadb14"
              starDimension="16px"
              starSpacing="2px"
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="Write comment about product..."
            ></textarea>
            <button className="btn btn--animated btn--primary--blue btn--border--blue">
              Gửi đánh giá
            </button>
          </div>
        </div>

        <ProductReviewDetail />
      </div>
    </>
  );
}

export default ProductReviews