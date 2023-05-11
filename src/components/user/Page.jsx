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
import OrderSummary from './checkout/OrderSummary';
import ShippingDetail from './checkout/ShippingDetail';
import Payment from './checkout/Payment';

const Page = () => {
  const state = useContext(GlobalState);
  // console.log(state)
  
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/product" component={ProductDetail} />
        <Route path="/order-summary" component={OrderSummary} />
        <Route path="/shipping-detail" component={ShippingDetail} />
        <Route path="/payment" component={Payment} />
        <Route path="/" component={Banner} />
      </Switch>
    </Router>
  );
}

export default Page