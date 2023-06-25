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
  const [savePd,setSavePd] = useState([]);
  const [rating,setRating] = useState();
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
  },[]);

  useEffect(() => {
    if(data){
    const fetchProductData = async () => {
      try {
        const productDataList = await Promise.all(data.map(async (product) => {
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
  }, [data]);

  useEffect(() => {
    if (savePd.length > 0) {
      data.forEach((product) => {
        const productData = savePd.find((pd) => pd.productId === product._id);
        if (productData) {
          const feedbackData = productData.productData.feedback;
          setRating(feedbackData);
        }
      });
    }
  }, [savePd, data]);

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
                const productData = savePd.find((pd) => pd.productId === _id);
                const feedbackData = productData
                  ? productData.productData.feedback
                  : [];
                const totalRating = getTotalRating(feedbackData);
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
                                rating={totalRating.totalRating ? totalRating.totalRating : 0}
                                starRatedColor="#fadb14"
                                starDimension="16px"
                                starSpacing="2px"
                              />
                              <span>({totalRating.total ? totalRating.total : 0})</span>
                            </div>
                          </div>
                          <span>sold : {sold}</span>
                          <Link to={`/detail/${_id}`} className="btn btn--animated btn--primary--white btn--border--blue">
                            Buy now
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
      <div className="about-us">
        <h2>About Lao Tech</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, possimus iusto, accusamus omnis explicabo provident aliquid, aspernatur repellat sit magnam error quos nulla! Consequatur minima quidem obcaecati? Tempora, eos quia!</p>
      </div>
    </>
  );
};

export default BestSeller;
