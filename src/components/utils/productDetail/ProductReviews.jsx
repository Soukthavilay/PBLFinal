import React from 'react'
import StarRatings from "react-star-ratings";

function ProductReviews() {
  var userStar = 5;
  var totalStar = 0;
  let averageStar = 0;
  let commentList = [1, 2, 3, 4, 5, 6];
  let totalComment = commentList.length;
  if (commentList.length > 0) {
    for (var i = 0; i < commentList.length; i++) {
      totalStar += commentList[i];
    }
    averageStar = totalStar / commentList.length;
  }
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
            <button className="btn btn--animated btn--primary--blue btn--border--blue">
              Gửi đánh giá
            </button>
          </div>
        </div>
        <div className="product-reviews-detail">
          <div className="reviews-detail-item">
            <div className="reviews-detail-avatar">
              <span>J</span>
            </div>
            <div className="reviews-detail-content">
              <h5 className="reviews-username">John</h5>
              <StarRatings
                name="rating"
                rating={userStar}
                starRatedColor="#fadb14"
                starDimension="16px"
                starSpacing="2px"
              />
              <p className="reviews-comment-detail" reviews-comment-detail>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo voluptatem nulla quibusdam possimus, similique porro
                inventore vitae distinctio minus, nihil voluptatibus adipisci?
                Ratione tempora perferendis debitis blanditiis labore sed?
                Deleniti?
              </p>
            </div>
          </div>
          <div className="reviews-detail-item">
            <div className="reviews-detail-avatar">
              <span>J</span>
            </div>
            <div className="reviews-detail-content">
              <h5 className="reviews-username">John</h5>
              <StarRatings
                name="rating"
                rating={userStar}
                starRatedColor="#fadb14"
                starDimension="16px"
                starSpacing="2px"
              />
              <p className="reviews-comment-detail" reviews-comment-detail>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo voluptatem nulla quibusdam possimus, similique porro
                inventore vitae distinctio minus, nihil voluptatibus adipisci?
                Ratione tempora perferendis debitis blanditiis labore sed?
                Deleniti?
              </p>
            </div>
          </div>
          <div className="reviews-detail-item">
            <div className="reviews-detail-avatar">
              <span>J</span>
            </div>
            <div className="reviews-detail-content">
              <h5 className="reviews-username">John</h5>
              <StarRatings
                name="rating"
                rating={userStar}
                starRatedColor="#fadb14"
                starDimension="16px"
                starSpacing="2px"
              />
              <p className="reviews-comment-detail" reviews-comment-detail>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo voluptatem nulla quibusdam possimus, similique porro
                inventore vitae distinctio minus, nihil voluptatibus adipisci?
                Ratione tempora perferendis debitis blanditiis labore sed?
                Deleniti?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviews