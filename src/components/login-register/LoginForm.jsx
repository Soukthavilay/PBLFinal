import React, { useState, useContext } from "react";
import "../utils/scss/login.scss";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import Loading from "../utils/Loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const addClass = () => {
    if (!active) setActive(true);
  };
  const removeClass = () => {
    if (active) setActive(false);
  };

  // LOGIN
  const loginState = useContext(GlobalState);
  const [isAdmin] = loginState.userAPI.isAdmin;
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { ...loginFormData },
        { withCredentials: true }
      );
      const token = response.data.accesstoken;
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", token);

      if (isAdmin) {
        window.location.href = "admin/createProduct";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.response.data.msg); // Display error message in ToastContainer
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const registerState = useContext(GlobalState);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: 0,
  });
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/register",
        { ...registerFormData },
        { withCredentials: true }
      );
      const token = response.data.accesstoken;
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", token);
      setRegisterSuccess(true);

      if (isAdmin) {
        window.location.href = "/Admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.response.data.msg); // Display error message in ToastContainer
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {loading && <Loading />}
      <ToastContainer /> {/* Render the ToastContainer for displaying error messages */}
      <div
        className={
          active
            ? "sign-in-form container right-panel-active"
            : "sign-in-form container"
        }
        id="main"
      >
        <div className="register">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleRegisterChange}
              value={registerFormData.name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleRegisterChange}
              value={registerFormData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleRegisterChange}
              value={registerFormData.password}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleRegisterChange}
              value={registerFormData.phone}
            />
            <button type="submit" className="btn btn--animated btn--primary--blue btn--border--blue">
              Register
            </button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleLoginChange}
              value={loginFormData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLoginChange}
              value={loginFormData.password}
              required
            />
            <button
              className="btn btn--animated btn--primary--blue btn--border--blue"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-left">
              <h1>Welcome Back!</h1>
              <button id="login" onClick={removeClass}>
                Log In
              </button>
            </div>
            <div className="overlay-right">
              <h1>Hello, Friend</h1>
              <p>Enter your personal detail and start the journey with us</p>
              <button id="register" onClick={addClass}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
