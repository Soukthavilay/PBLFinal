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
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Recommand = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [savePd,setSavePd] = useState([]);
  const [rating,setRating] = useState();
  useEffect(() => {
    if(products){
    const fetchProductData = async () => {
      try {
        const productDataList = await Promise.all(products.map(async (product) => {
          const productId = product._id;
          const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
          const productData = response.data;
          return { productId, productData };
        }));
        setSavePd(productDataList);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProductData();
  }
  }, [products]);

  useEffect(() => {
    if (savePd.length > 0) {
      products.forEach((product) => {
        const productData = savePd.find((pd) => pd.productId === product._id);
        if (productData) {
          const feedbackData = productData.productData.feedback;
          setRating(feedbackData);
        }
      });
    }
  }, [savePd, products]);

  const getTotalRating = (feedbackData) => {
    let totalRating = 0;
    if (feedbackData.length > 0) {
      feedbackData?.forEach((feedback) => {
        totalRating += feedback.rating;
      });
      var result = {
        totalRating: totalRating / feedbackData.length,
        total: feedbackData.length
      }
      return result;
    }
    return 0;
  };

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
                const productData = savePd.find((pd) => pd.productId === _id);
                const feedbackData = productData
                  ? productData.productData.feedback
                  : [];
                const totalRating = getTotalRating(feedbackData);
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
                                rating={totalRating.totalRating}
                                starRatedColor="#fadb14"
                                starDimension="16px"
                                starSpacing="2px"
                              />
                              <span>({totalRating.total})</span>
                            </div>
                          </div>
                          <span>sold : {sold}</span>
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
