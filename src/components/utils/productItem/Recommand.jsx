// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import StarRatings from "react-star-ratings";

// import required modules
import { Navigation } from "swiper";

import "../scss/recommend.scss";
import "../scss/common.scss";
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import {Link} from 'react-router-dom';

const Recommand = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;

  var userStar = 5;
  var numberComments = 12;
  return (
    <>
      <div className="featured-product">
        <p className="featured-product-title">New Products</p>
        <div className="container-list">
          <Swiper
            spaceBetween={50}
            loop={true}
            slidesPerView={4}
            navigation={true}
            className="featured-product-slide"
            modules={[Navigation]}
          >
            {products &&
              products.map((item) => {
                const { _id, title, images, price ,sold} = item;
                // console.log(item);
                return (
                  <SwiperSlide key={_id}>
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
                              {price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
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
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Recommand;
