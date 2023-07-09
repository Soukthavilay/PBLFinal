import { Link } from 'react-router-dom'
import '../scss/categoryItem.scss'
import { GlobalState } from '../../../GlobalState'
import { useContext, useEffect, useState } from 'react'
const CategoryItem = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [categoryIDs, setCategoryIDs] = useState([]);
  const device = '6459f014aff6f728c08833f4'
  const phones = '649493dce5433929c840ec05'
  const laptop = '6459f1a2aff6f728c088341f'
  const headphone = '6459f058aff6f728c08833f7'
  const speaker = '6459f12daff6f728c0883415'
  useEffect(()=>{
    const categoryNames = ['Laptop', 'Phones', 'Devices', 'Headphones','Speakers'];
    const filteredIDs = categories.filter((item)=> categoryNames.includes(item.name)).map((item)=> item._id);
    setCategoryIDs(filteredIDs);
  },[categories]);
  return (
    <>
      <div className="categories-item">
        <div className="banners-double">
          <Link to={`/product-list/${laptop}`} className="banner_fam" title="Laptop">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11486-grande.jpg" />
                <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11486_mobile.jpg" />
                <img src="https://cache.tradeinn.com/images/banners-categorias/11486-grande.jpg" alt="Computers" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>Computers</h2>
              </div>
            </div>
          </Link>
          <Link to={`/product-list/${phones}`} className="banner_fam" title="Phones">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11488-grande.jpg" />
                <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11488_mobile.jpg" />
                <img src="https://cache.tradeinn.com/images/banners-categorias/11488-grande.jpg" alt="Phones" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>Phones</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="banners-triple">
          <Link to={`/product-list/${device}`} className="banner_fam" title="Devices">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11490-peke.jpg" />
                <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11490_mobile.jpg" />
                <img src="https://cache.tradeinn.com/images/banners-categorias/11490-peke.jpg" alt="Devices" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>Devices</h2>
              </div>
            </div>
          </Link>
          <Link to={`/product-list/${headphone}`} className="banner_fam" title="Headphones">
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11494-peke.jpg" />
                <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11494_mobile.jpg" />
                <img src="https://cache.tradeinn.com/images/banners-categorias/11494-peke.jpg" alt="Consoles" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>Accessories</h2>
              </div>
            </div>
          </Link>
          <Link to={`/product-list/${speaker}`} className="banner_fam" title='Speakers'>
            <div className="view">
              <picture>
                <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11499-peke.jpg" />
                <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/pixel_mobile.jpg" />
                <img src="https://cache.tradeinn.com/images/banners-categorias/11499-peke.jpg" alt="Big Appliances" className="logo-corto" />
              </picture>
              <div className="block_gris"></div>
              <div className="topbannerh">
                <h2 className='nom_banner_h'>Speakers</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CategoryItem