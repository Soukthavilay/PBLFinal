// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

// import required modules
import { Navigation } from "swiper";

import "../scss/recommend.scss";
import { useEffect } from "react";
import { useState } from "react";

const BestSeller = () => {
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

  const product = data;
  return (
    <>
      <div className="featured-product">
        <p className="featured-product-title">Best Sellers</p>
        <div className="container-list">
          <Swiper
            spaceBetween={50}
            loop={true}
            slidesPerView={4}
            pagination={{
              clickable: true,
            }}
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
                        <a href="">
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
                          <p className="product-price">
                            {price.toLocaleString("vi-VN")}
                          </p>
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
      <div className="about-us">
        <h2>About Lao Tech</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, possimus iusto, accusamus omnis explicabo provident aliquid, aspernatur repellat sit magnam error quos nulla! Consequatur minima quidem obcaecati? Tempora, eos quia!</p>
      </div>
    </>
  );
};

export default BestSeller;
