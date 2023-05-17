import React from 'react'
import StarRatings from "react-star-ratings";


function ProductReviewDetail() {
  var userStar = 5;

  return (
    <>
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
            <p className="reviews-comment-detail">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              voluptatem nulla quibusdam possimus, similique porro inventore
              vitae distinctio minus, nihil voluptatibus adipisci? Ratione
              tempora perferendis debitis blanditiis labore sed? Deleniti?
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
            <p className="reviews-comment-detail">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              voluptatem nulla quibusdam possimus, similique porro inventore
              vitae distinctio minus, nihil voluptatibus adipisci? Ratione
              tempora perferendis debitis blanditiis labore sed? Deleniti?
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
            <p className="reviews-comment-detail">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              voluptatem nulla quibusdam possimus, similique porro inventore
              vitae distinctio minus, nihil voluptatibus adipisci? Ratione
              tempora perferendis debitis blanditiis labore sed? Deleniti?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviewDetail