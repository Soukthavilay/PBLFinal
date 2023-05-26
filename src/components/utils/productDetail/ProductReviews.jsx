import React, { useEffect } from 'react'
import { useState } from 'react';
import StarRatings from "react-star-ratings";
import ProductReviewDetail from './ProductReviewDetail';
import axios from 'axios';

function ProductReviews(detailProduct) {
  const dtProduct = detailProduct.detailProduct;
  const idProduct = dtProduct._id;
  const [result,setResult] = useState(0);
  const [feedback,setFeedback] = useState([]);

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
  useEffect(()=>{
    
    if (feedback && feedback.length){
      var total = 0;
      feedback?.map((FeedbackItem)=>{
        total += FeedbackItem.rating;
      })
      setResult(total / feedback.length);
    }
  },[feedback]);
  const feedbackTotal = feedback?.length || 0;
  return (
    <>
      <div className="product-reviews">
        <h3 className="product-reviews-title">Product Reviews</h3>
        <div className="product-reviews-summary">
          <div className="reviews-summary-item">
            <h4>Average rating</h4>
            <span className="average-star">{result} / {feedbackTotal}</span>
            <StarRatings
              name="rating"
              rating={result}
              starRatedColor="#fadb14"
              starDimension="16px"
              starSpacing="2px"
            />
            <span className="total-comment">Review</span>
          </div>
          <div className="reviews-summary-item">
            <p>Have you used this product?</p>
            <button
              className="btn btn--animated btn--primary--blue btn--border--blue"
              onClick={handleToggle}
            >
              Submit a review
            </button>
          </div>
        </div>

        <div
          className={
            showHideComment ? "comment-container show" : "comment-container hide"
          }
        >
          <h3>Write a product review</h3>
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
            <div className="uploadImg">
              <input
                type="file"
                name="file"
                id="file_up"
              />
              <div id="" className="no-line"></div>
              <div id="file_img">
                <img src={""} alt="" />
                <span>X</span>
              </div>
            </div>
            <button className="btn btn--animated btn--primary--blue btn--border--blue">
              Submit a review
            </button>
          </div>
        </div>
        {feedback?.length ? (
          feedback.map((item) => <ProductReviewDetail key={item._id} fd={item} />)
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </>
  );
}

export default ProductReviews