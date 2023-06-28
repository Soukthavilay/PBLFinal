import React from "react";
import StarRatings from "react-star-ratings";
import { useState } from 'react';

function ProductReviewDetail(fd) {
  const feedback = fd.fd;
  const createdAtDateTime = new Date(feedback.createdAt);
  const currentDateTime = new Date();
  const minutesDifference = Math.floor(
    (createdAtDateTime - currentDateTime) / (1000 * 60)
  );
  const formattedDateTime = createdAtDateTime.toLocaleString();
  const [showHideComment, setShowHideComment] = useState(false);
  const handleToggle = () => {
    setShowHideComment(!showHideComment);
  };

  const handleReplyFeedback = () => {
    // Xử lý logic khi người dùng nhấp vào nút "Reply Feedback"
    // Ví dụ: Hiển thị một giao diện để nhập và gửi phản hồi
  };

  return (
    <>
      <div className="product-reviews-detail">
        <div className="reviews-detail-item">
          <div className="reviews-detail-avatar">
            <span>{feedback.username?.charAt(0)}</span>
          </div>
          <div className="reviews-detail-content">
            <div className="review-detail-content_header">
              <div className="review-detail-content_header-left">
                <h5 className="reviews-username">{feedback.username}</h5>
                <StarRatings
                  name="rating"
                  rating={feedback.rating}
                  starRatedColor="#fadb14"
                  starDimension="16px"
                  starSpacing="2px"
                />
              </div>
              <div className="review-detail-content_header-right">
                <p>{formattedDateTime} </p>
                {/* <p className="reviews-comment-detail">
                  {minutesDifference}
                </p> */}
              </div>
            </div>
            <img src={feedback.image_url} alt={feedback.image_url} width={200} />
            <p className="review-comment-text">{feedback.content}</p>
            
            {/* REPLY SECTION */}
            {/* <div className="review-reply">
              <button className="reply-btn" onClick={handleToggle}>Reply</button>
              <div className={showHideComment ? 'review-reply-form show' : 'review-reply-form hide'}>
                <textarea name="" id="" cols="30" rows="10" placeholder="Write reply..."></textarea>
                <div className="reply-submit-btn">
                  <button className="btn btn--animated btn--primary--blue btn--border--blue">Send reply</button>
                </div>
              </div>
            </div> */}
            
            {/* REPLY CONTENT */}
            {/* <div className="reply-content">
              <div className="reply-content-item">
                <div className="reviews-detail-avatar">
                  <span>K</span>
                </div>
                <div className="reply-detail">
                  <div className="reply-content-item_header">
                    <div className="reply-content-item_header-left">
                      <div className="reply-content-username">
                        <span>Koh Koh</span>
                        <span className="reply-content-username_role">Admin</span>
                      </div>
                    </div>
                    <div className="reply-content-item_header-right">
                      <p>{formattedDateTime} </p>
                    </div>
                  </div>
                  <div className="reply-content-item_detail">
                    <p>San pham verigut</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviewDetail;
