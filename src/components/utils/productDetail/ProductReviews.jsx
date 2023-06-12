import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import ProductReviewDetail from './ProductReviewDetail';
import axios from 'axios';

function ProductReviews(detailProduct) {
  const dtProduct = detailProduct.detailProduct;
  const idProduct = dtProduct._id;
  const [result, setResult] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [showHideComment, setShowHideComment] = useState(false);
  const [selectStar, setSelectStar] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    if (idProduct) {
      const getFeedback = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/products/${idProduct}`);
          setFeedback(res.data.feedback);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getFeedback();
    }
  }, [idProduct]);

  const handleToggle = () => {
    setShowHideComment(!showHideComment);
  };

  const changeRating = (newRating) => {
    setSelectStar({
      rating: newRating,
    });
  };

  useEffect(() => {
    if (feedback && feedback.length) {
      var total = 0;
      feedback?.map((FeedbackItem) => {
        total += FeedbackItem.rating;
      });
      setResult(total / feedback.length);
    }
  }, [feedback]);

  const feedbackTotal = feedback?.length || 0;

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 8);
  };

  // Tính toán chỉ mục của phản hồi trong trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedback.slice(indexOfFirstItem, indexOfLastItem);

  // Tạo mảng các số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(feedback.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Chuyển đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="product-reviews">
        <h3 className="product-reviews-title">Đánh giá sản phẩm</h3>
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
            showHideComment ? 'comment-container show' : 'comment-container hide'
          }
        >
          {/* Mã code biểu mẫu đánh giá */}
        </div>

        {feedback?.length ? (
          <>
            {currentItems.map((item) => (
              <ProductReviewDetail key={item._id} fd={item} />
            ))}
            {feedback.length > itemsPerPage && (
              <div className="pagination">
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={pageNumber === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            )}
            {/* {itemsPerPage < feedback.length && (
              <button className="btn btn--load-more" onClick={handleLoadMore}>
                Xem thêm
              </button>
            )} */}
          </>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </>
  );
}

export default ProductReviews;
