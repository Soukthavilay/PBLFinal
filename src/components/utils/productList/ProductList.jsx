import "../../utils/scss/product-list.scss";
import StarRatings from "react-star-ratings";
import { useContext,useState ,useEffect} from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loading from "../Loading/Loading";
import ServiceList from "./ServiceList";
import SideBar from "./SideBar";

function ProductList() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const params = useParams();
  const [categoryList,setCategoryList] = useState();
  const [pdcate,setPdcate] = useState();
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    if(params.id && categories.length > 0){
      const category = categories.find(category => category._id === params.id);
      if (category) {
        setCategoryList(category._id);
      } else {
        console.log('No categories found for ID');
      }
    }
  },[params.id, categories]);


  useEffect(()=>{
    setLoading(true);
    if(categoryList){
      const getProductByCategory = async ()=>{
        const res = await axios.get(`http://localhost:5000/api/products/category/${categoryList}`)
        setPdcate(res.data.products);
        setLoading(false);
      }
      getProductByCategory();
    }
  },[categoryList]);
  useEffect(()=>{
    if(pdcate?.length === 0 || pdcate === undefined){
      setLoading(true);
    } else {
      setLoading(false);
    }
  },[pdcate])
  var userStar = 5;
  return (
    <div className="product-list">
      {/* <h2>Product list</h2> */}
      <ServiceList />
      <div className="product-list-content">
        <SideBar />

        {loading ? (
          <>{loading && <Loading />}</>
        ) : (
          <>
            <div className="product-list-items">
              {pdcate &&
                pdcate.map((item) => {
                  const { _id, title, images, price, sold } = item;
                  return (
                    <div className="product-item" key={_id}>
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
                              {new Intl.NumberFormat("vi-LA", {
                                style: "currency",
                                currency: "KIP",
                              }).format(price)}
                            </p>
                            <div className="product-ratings">
                              <StarRatings
                                name="rating"
                                rating={userStar}
                                starRatedColor="#fadb14"
                                starDimension="12px"
                                starSpacing="2px"
                              />
                              <span>({sold})</span>
                            </div>
                          </div>
                          <Link
                            to={`/detail/${_id}`}
                            className="btn btn--animated btn--primary--white btn--border--blue"
                          >
                            Mua ngay
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList