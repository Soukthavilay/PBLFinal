import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BiUser, BiSearchAlt } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { AiOutlineHistory, AiOutlineHeart } from 'react-icons/ai';
import Logo from './icon/logo-white-1.svg';
import { gsap } from 'gsap';

function Header(props) {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);
  const isShown = props.isShown;

  // const onEnter = ({ currentTarget }) => {
  //   gsap.to(currentTarget, {
  //     repeatDelay: 1,
  //     yoyo: true,
  //     scale: 1.3,
  //   });
  // };
  // const onLeave = ({ currentTarget }) => {
  //   gsap.to(currentTarget, { scale: 1 });
  // };

  const logoutUser = async () => {
    await axios.get('http://localhost:5000/user/logout');
    localStorage.removeItem('firstLogin');
    window.location.href = '/';
  };
  if(isShown){
    const ToggleSidebar = () => {
      const [isOpen, setIsopen] = useState(false);
      const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
      };
      return (
        <>
          <div className="btn btn-primary" onClick={ToggleSidebar}>
            <i className="fa fa-bars"></i>
            <div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
              <div className="sd-body">
                <ul>
                  <li>
                    <Link to="/create_product">Create Product</Link>
                  </li>
                  <li>
                    <Link to="/category">Create Category</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`}
              onClick={ToggleSidebar}
            ></div>
          </div>
        </>
      );
    };
  
    const adminRouter = () => {
      return (
        <>
          <ToggleSidebar />
        </>
      );
    };
  
    const loggedRouter = () => {
      return (
        <>
          <li>
            <Link to="/history">
              <AiOutlineHistory />
            </Link>
          </li>
          <li>
            <Link to="/infor">
              <BiUser />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logoutUser}>
              <HiOutlineLogout />
            </Link>
          </li>
        </>
      );
    };
  
    const styleMenu = {
      left: menu ? 0 : '-100%',
    };
  
    return (
      <header>
        <div className="menu" onClick={() => setMenu(!menu)}>
          <img src={Menu} alt="" width="30" />
        </div>
  
        <div className="logo">
          <h1>
            <Link to="/">
              {isAdmin ? (
                //
                'Admin'
              ) : (
                <h2>Laos Technolygy</h2>
              )}
            </Link>
          </h1>
        </div>
  
        <ul style={styleMenu}>
          <li>
            <Link to="/">{'home'}</Link>
          </li>
          <li>
            <Link to="/products">{isAdmin ? 'Products' : 'Shop'}</Link>
          </li>
          {/* <li onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <Link to="/about">{'about'}</Link>
          </li>
          <li onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <Link to="/contact">{'contact'}</Link>
          </li> */}
  
          {isAdmin && adminRouter()}
          {isLogged ? (
            loggedRouter()
          ) : (
            <li>
              <Link to="/login">
                {/* <BiUser /> */}LOGIN
              </Link>
            </li>
          )}
          <li onClick={() => setMenu(!menu)}>
            <img src={Close} alt="" width="30" className="menu" />
          </li>
        </ul>
  
        {isAdmin ? (
          ''
        ) : (
          <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/cart">
              {/* <img src={Cart} alt="" width="30" /> */}
              <BsCart3 />
            </Link>
          </div>
        )}
      </header>
    );
  }
  else {
    return null;
  }
}
  
// comments

export default Header;
