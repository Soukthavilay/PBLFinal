import Band from '../../utils/band/Band'
import CategoryItem from '../../utils/categoryItem/CategoryItem'
import BestSeller from '../../utils/productItem/BestSeller'
import Recommand from '../../utils/productItem/Recommand'
import RecommenderUser from '../../utils/productItem/RecommenderUser'
import '../../utils/scss/banner.scss'


const Banner = () => {
  return (
    <>
        <div className="banner">
            <div className='img-slide'>
                <div className='wrapper'>
                    <img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683301470/final/apple2_iml2ug.jpg" alt="apple" />
                </div>
            </div>
        </div>
        <Band/>
        <CategoryItem/>
        <RecommenderUser/>
        <Recommand/>
        <BestSeller/>
    </>
    
  )
}

export default Banner