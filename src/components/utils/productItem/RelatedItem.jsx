// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import StarRatings from "react-star-ratings";
import moment from 'moment';

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

const RelatedItem = (categories) => {
  const state = useContext(GlobalState);
  const categoryID = categories.category;
  const [products] = state.productsAPI.products;
  const [savePd,setSavePd] = useState([]);
  const [rating,setRating] = useState();
  const [pdCate,setPdCate] = useState([]);
  useEffect(() => {
    if(products){
    const fetchProductData = async () => {
      try {
        const productDataList = await Promise.all(products.map(async (product) => {
          const productId = product._id;
          const response = await axios.get(`https://pbl-technology-988327da4050.herokuapp.com/api/products/${productId}`);
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
  
  useEffect(()=>{
    if(categoryID){
        const getProductByCategory = async ()=>{
            const res = await axios.get(`https://pbl-technology-988327da4050.herokuapp.com/api/products/category/${categoryID}`)
            setPdCate(res.data.products)
        }
        getProductByCategory();
    }
  },[categoryID])

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
        <p className="featured-product-title">Related Products</p>
        <div className="container-list">
          <Swiper
            spaceBetween={50}
            loop={true}
            slidesPerView={4}
            navigation={true}
            className="featured-product-slide"
            modules={[Navigation]}
          >
            {pdCate &&
              pdCate.map((item) => {
                const { _id, title, images, price ,sold,discountPercentage,discountExpiration} = item;
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
                        {discountPercentage && discountExpiration ? 
                          <div className="coupon">
                            <span>{discountPercentage}%</span>
                            <span>OFF</span>
                            {/* <span>{discountExpiration ? moment(discountExpiration).format('DD/MM/YYYY') : ''}</span> */}
                          </div> : null
                        }
                      </div>
                      <div className="product-item-detail">
                        <h3 className="product-name">
                          <Link to={`/detail/${_id}`}>{title}</Link>
                        </h3>
                        <div className="product-detail">
                          <div className="product-detail-meta">
                            {discountPercentage ? 
                              <div className="price-both">
                                <span style={{ textDecoration: 'line-through' }}>{((price) / (1 - (discountPercentage / 100))).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}</span>
                                <span className="product-price">{price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}</span>
                              </div> : 
                              <span className="product-price">
                                {price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                              </span>
                            }
                            <div className="product-ratings">
                              <StarRatings
                                name="rating"
                                rating={totalRating.totalRating ? totalRating.totalRating : 0}
                                starRatedColor="#fadb14"
                                starDimension="16px"
                                starSpacing="2px"
                              />
                              <span>({totalRating.total ? totalRating.total : 0})</span>
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

export default RelatedItem;
