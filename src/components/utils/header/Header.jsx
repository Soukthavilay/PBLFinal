import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BsSearch, BsCart4} from 'react-icons/bs';
import {FiUser} from 'react-icons/fi';
import {MdLogout} from 'react-icons/md'

import { GlobalState } from "../../../GlobalState";

import '../scss/header.scss';
import axios from "axios";

const Header = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const userDetail = state.userAPI.detail;
    const [cart] = state.userAPI.cart;
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    }, [cart]);

    const logoutUser = async () => {
        await axios.get('http://localhost:5000/user/logout');
        localStorage.removeItem("accessToken")
        // window.location.href = '/';
        window.location.reload();
    };

    const LogoutRouter = () => {
        return (
          <>
            <div className="header__right">
                <Link target="_parent" to='/myInfo' className="user-sign">
                    <label>{userDetail[0].name}</label>
                    <div className="my-account">
                        My account 
                    </div>
                </Link>
                <Link to="/" onClick={logoutUser}>
                    <MdLogout/>
                </Link>
                <div className="header-cart">
                    <Link to="/order-summary">
                        <BsCart4/>
                        <span className="header-cart-count">{cartCount}</span>
                    </Link>
                </div>
            </div>
          </>
            
        )
    }

    return (
      <header className="header">
        <div className="header__logo">
          <Link target="_parent" to="/">
            <svg width="164" height="42" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="a" d="M28.205.16H.196v39.064h28.009V.159z" />
                <path id="c" d="M60.007 28.001V.084H.009v27.917z" />
              </defs>
              <g fill="none" fillRule="evenodd">
                <path
                  d="M17.709 39.62c-1.354.47-3.75.73-5.677.73-7.448 0-9.896-3.23-9.167-9.272l1.25-9.844H0l.782-6.354L5 13.733l.677-5.207 10.522-2.709-.937 7.656h5.937l-.938 7.761h-5.937l-1.094 8.698c-.208 1.666.468 2.449 2.291 2.449 1.459 0 2.762-.313 2.97-.365l-.782 7.605zM34.743 24.204c1.822 0 2.968-.678 3.177-2.344.208-1.667-.781-2.344-2.604-2.344-2.292 0-4.271 1.562-4.584 4.688h4.01zm-4.688 5.207c-.416 2.5.937 3.543 5.313 3.543 3.334 0 6.823-.73 9.375-1.563l-.729 7.135c-3.333 1.303-7.76 1.824-10.937 1.824-9.637 0-12.918-4.428-11.773-13.855C22.451 17.067 27.19 12.64 36.15 12.64c8.49 0 11.51 2.917 10.834 8.386-.677 5.469-4.428 8.385-12.917 8.385h-4.011zM63.131 12.64c3.02 0 5.26.418 6.771 1.042l-1.093 8.23c-1.146-.47-2.657-.886-4.793-.886-3.333 0-5.26 1.407-5.781 5.469-.468 4.063 1.094 5.468 4.427 5.468 2.135 0 3.75-.417 5-.885l-.885 8.23c-1.667.625-4.01 1.042-7.031 1.042-9.585 0-12.605-4.896-11.512-13.855 1.094-8.958 5.313-13.855 14.897-13.855"
                  fill="#404040"
                />
                <g transform="translate(69.551 .292)">
                  <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                  </mask>
                  <path
                    d="M15.196.16L13.53 13.7c1.927-.884 4.323-1.353 6.354-1.353 7.605 0 8.803 4.01 8.178 9.115l-2.135 17.761h-10.21L17.75 22.4c.156-1.302-.313-2.084-1.718-2.084-1.46 0-2.71.522-3.438.938l-2.188 17.97H.196L4.988.159h10.208z"
                    fill="#404040"
                    mask="url(#b)"
                  />
                </g>
                <g transform="translate(102.52 12.486)">
                  <mask id="d" fill="#fff">
                    <use xlinkHref="#c" />
                  </mask>
                  <path
                    fill="#000"
                    mask="url(#d)"
                    d="M.01 28.001h56.528L60.008.084H3.48z"
                  />
                </g>
                <path
                  d="M133.732 16.548v.004c-.014 0-.027-.004-.041-.004-1.296 0-2.486 1.052-2.643 2.338l-.351 2.861-.655 5.33-.25 2.034-7.88-12.563h-4.71l-1.158 9.422-.87 7.085-.287 2.338h2.095v-.027c.086.01.17.027.26.027 1.295 0 2.485-1.053 2.643-2.338l1.256-10.226 7.88 12.564h4.711l1.157-9.423.87-7.084.287-2.338h-2.314zM112.531 16.548v.004c-.014 0-.028-.004-.04-.004-1.296 0-2.486 1.052-2.644 2.338l-.351 2.861-.655 5.33-.734 5.978-.287 2.338h2.247v-.011c.038.002.071.011.109.011 1.295 0 2.485-1.053 2.642-2.338l1.74-14.169.288-2.338h-2.315zM156.96 18.885l.287-2.337h-2.314l-.001.004c-.013 0-.027-.004-.04-.004-1.296 0-2.485 1.052-2.643 2.338l-.352 2.861-.654 5.33-.25 2.034-7.88-12.563h-4.711l-1.157 9.423-.87 7.084-.287 2.338h2.094v-.027c.086.01.17.027.261.027 1.296 0 2.485-1.052 2.643-2.338l1.256-10.226 7.88 12.564h4.71l1.157-9.422.871-7.085z"
                  fill="#FFF"
                />
              </g>
            </svg>
          </Link>
          <label>
            Technology shop by <strong>Laos company</strong>
          </label>
        </div>
        <div className="header__between">
          <BsSearch className="icon-search" />
          <input
            className="input-search"
            placeholder="SEARCH HERE"
            type="text"
          />
        </div>
        {isLogged ? (
          LogoutRouter()
        ) : (
          <div className="header__right">
            <Link target="_parent" to="/sign-in" className="user-sign">
              {/* <label>Sign in</label> */}
              <div className="my-account">
                Sign in <FiUser />
              </div>
            </Link>
            <div className="header-cart">
              <BsCart4 />
              <span className="header-cart-count">0</span>
            </div>
          </div>
        )}
      </header>
    );
}

export default Header;
