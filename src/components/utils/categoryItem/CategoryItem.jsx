import {Link} from 'react-router-dom'
import '../scss/categoryItem.scss'
const CategoryItem = () => {
  return (
    <>
        <div className="categories-item">
            <div className="banners-double">
                <Link to="#" className="banner_fam">
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
                <Link to="#" className="banner_fam">
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
                <Link to="#" className="banner_fam">
                    <div className="view">
                        <picture>
                            <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11490-peke.jpg" />
                            <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11490_mobile.jpg" />
                            <img src="https://cache.tradeinn.com/images/banners-categorias/11490-peke.jpg" alt="Devices" className="logo-corto" />
                        </picture>
                        <div className="block_gris"></div>
                        <div className="topbannerh">
                            <h2 className='nom_banner_h'>Phones</h2>
                        </div>
                    </div>
                </Link>
                <Link to="#" className="banner_fam">
                    <div className="view">
                    <picture>
                        <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11494-peke.jpg" />
                        <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11494_mobile.jpg" />
                        <img src="https://cache.tradeinn.com/images/banners-categorias/11494-peke.jpg" alt="Consoles" className="logo-corto" />
					</picture>
                        <div className="block_gris"></div>
                        <div className="topbannerh">
                            <h2 className='nom_banner_h'>Phones</h2>
                        </div>
                    </div>
                </Link>
                <Link to="#" className="banner_fam">
                    <div className="view">
                    <picture>
                        <source media="(min-width: 721px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/11499-peke.jpg" />
                        <source media="(max-width: 720px)" srcSet="https://cache.tradeinn.com/images/banners-categorias/pixel_mobile.jpg" />
                        <img src="https://cache.tradeinn.com/images/banners-categorias/11499-peke.jpg" alt="Big Appliances" className="logo-corto" />
					</picture>
                        <div className="block_gris"></div>
                        <div className="topbannerh">
                            <h2 className='nom_banner_h'>Phones</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

export default CategoryItem