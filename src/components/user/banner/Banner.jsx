import Band from '../../utils/band/Band'
import NewProducts from '../../utils/band/NewProducts'
import CategoryItem from '../../utils/categoryItem/CategoryItem'
import BestSeller from '../../utils/productItem/BestSeller'
import Recommand from '../../utils/productItem/Recommand'
import RecommenderUser from '../../utils/productItem/RecommenderUser'
import '../../utils/scss/banner.scss'


const Banner = () => {
  return (
    <>
        <div className="banner">
            <div className="banner-content">
              <h2>Shopping without limited!!!</h2>
              <h1>Discover our products!</h1>
              <button className='btn btn--animated btn--primary--blue btn--border--blue'>Shopping now</button>
            </div>
            <div className='img-slide'>
                <div className='wrapper'>
                  <img src="https://res.cloudinary.com/dkiofoako/image/upload/v1688319421/asus-lineup_qjlfw4.png" alt="apple" />
                </div>
            </div>
        </div>
        {/* <Band/> */}
        <NewProducts />
        {/* <CategoryItem/> */}
        <RecommenderUser/>
        <Recommand/>
        <BestSeller/>
    </>
    
  )
}

export default Banner