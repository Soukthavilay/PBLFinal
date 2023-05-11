// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import StarRatings from "react-star-ratings";

// import required modules
import { Navigation } from "swiper";

import "../scss/recommend.scss";
import "../scss/common.scss";
import { useEffect } from "react";
import { useState } from "react";

const Recommand = () => {
  const [data,setData] = useState();
  useEffect(()=>{
    try {
      const getProducts = async()=>{
        const res = await axios.get("https://fakestoreapi.com/products");
        setData(res.data);
      }
      getProducts();
    } catch (error) {
      console.log("error.message")
    }
  },[])

  var userStar = 5;
  var numberComments = 12;
  return (
    <>
      <div className="featured-product">
        <p className="featured-product-title">Recommended for you</p>
        <div className="container-list">
          <Swiper
            spaceBetween={50}
            loop={true}
            slidesPerView={4}
            navigation={true}
            className="featured-product-slide"
            modules={[Navigation]}
          >
            {data &&
              data.map((item) => {
                const { id, title, image, price } = item;
                return (
                  <SwiperSlide key={id}>
                    <div className="product-item">
                      <div className="product-item-image">
                        <a href="" target="_blank">
                          <img src={image} alt={image} />
                        </a>
                      </div>
                      <div className="product-item-detail">
                        <h3 className="product-name">
                          <a href="">
                            <span>{title}</span>
                          </a>
                        </h3>
                        <div className="product-detail">
                          <div className="product-detail-meta">
                            <p className="product-price">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(price)}
                            </p>
                            <div className="product-ratings">
                              <StarRatings
                                name="rating"
                                rating={userStar}
                                starRatedColor="#fadb14"
                                starDimension="16px"
                                starSpacing="2px"
                              />
                              <span>({ numberComments })</span>
                            </div>
                          </div>
                          <a className="btn btn--animated btn--primary--white btn--border--blue">
                            Mua ngay
                          </a>
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
