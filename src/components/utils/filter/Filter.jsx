import {Link} from 'react-router-dom';
import '../scss/filter.scss'
const Filter = () => {
  return (
    <>
        <div className="menu-content">
            <div className="menuMargen">
                <div className="Btncateg">
                    <Link to="#" className="btnCategories">
                        <div className='all-menu'>
                            all<span><svg width="8" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M4 5l4-5H0z" fill="#FFF" fillRule="evenodd"/></svg></span>
                        </div>
                        <strong>categories</strong>
                    </Link>
                </div>
                <div className="Btnband">
                    <Link to="/" className="btn-band">
                        <div className='all-menu'>
                            all<span><svg width="8" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M4 5l4-5H0z" fill="#FFF" fillRule="evenodd"/></svg></span>
                        </div>
                        <strong>brands</strong>
                    </Link>
                </div>
                <div className="menu-choice">
                    <ul className='option-menu'>
                        <li className='option'><Link to="#">Computers</Link></li>
                        <li className='option'><Link to="#">Phones</Link></li>
                        <li className='option'><Link to="#">Gaming</Link></li>
                        <li className='option'><Link to="#">Devices</Link></li>
                        <li className='option'><Link to="#">Hot Deals</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Filter