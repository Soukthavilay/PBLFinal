// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import StarRatings from "react-star-ratings";

// import required modules
import { Navigation } from "swiper";

import "../scss/recommend.scss";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BestSeller = () => {
  const [data,setData] = useState();
  useEffect(()=>{
    try {
      const getProducts = async()=>{
        const res = await axios.get("http://localhost:5000/api/products/top-sold");
        setData(res.data);
      }
      getProducts();
    } catch (error) {
      console.log("error.message")
    }
  },[])

  const product = data;
  var userStar = 5;
  var numberComments = 12;
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
                const { _id, title, images, price ,sold } = item;
                return (
                  <SwiperSlide key={_id}>
                    <div className="product-item">
                      <div className="product-item-image">
                        <a href="">
                          <img src={images.url} alt={images.url} />
                        </a>
                      </div>
                      <div className="product-item-detail">
                        <h3 className="product-name">
                          <Link to={`/detail/${_id}`}>
                            <span>{title}</span>
                          </Link>
                        </h3>
                        <div className="product-detail">
                          <div className="product-detail-meta">
                            <p className="product-price">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
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
                              <span>({sold})</span>
                            </div>
                          </div>
                          <a className="btn btn--animated btn--primary--white btn--border--blue">
                            Buy now
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
