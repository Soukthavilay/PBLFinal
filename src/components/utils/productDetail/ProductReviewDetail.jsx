import StarRatings from "react-star-ratings";

function ProductReviewDetail(fd) {
  const feedback = fd.fd;
  const createdAtDateTime = new Date(feedback.createdAt);
  const currentDateTime = new Date();
  const minutesDifference = Math.floor(
    (createdAtDateTime - currentDateTime) / (1000 * 60)
  );
  const formattedDateTime = createdAtDateTime.toLocaleString();
  return (
    <>
      <div className="product-reviews-detail">
        <div className="reviews-detail-item">
          <div className="reviews-detail-avatar">
            <span>{feedback.username}</span>
          </div>
          <div className="reviews-detail-content">
            <h5 className="reviews-username">{feedback.username}</h5>
            <StarRatings
              name="rating"
              rating={feedback.rating}
              starRatedColor="#fadb14"
              starDimension="16px"
              starSpacing="2px"
            />
            <p>{formattedDateTime} </p>
            <p className="reviews-comment-detail">
              {minutesDifference} {feedback.content} 
            </p>
            <img src={feedback.image_url} alt={feedback.image_url} width={200} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviewDetail