import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../login-register/Login';
import TopHeader from '../utils/top-header/TopHeader';
import Header from '../utils/header/Header';
import Banner from './banner/Banner';
import ProductDetail from './productDetail/ProductDetail';
import Filter from '../utils/filter/Filter';
import Register from '../login-register/Register';
import { GlobalState } from '../../GlobalState';
import { useContext } from 'react';
import Admin from '../admin/Admin';
import Notfound from '../utils/NotFound/Notfound';

const Page = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  
  return (
    <Router>
      <Switch>
      <Route path="/admin" component={isAdmin ? Admin : Notfound} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/product" component={ProductDetail} />
        <Route path="/" component={Banner} />
      </Switch>
    </Router>
  );
}

export default Page