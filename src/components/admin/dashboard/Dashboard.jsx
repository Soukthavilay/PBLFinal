import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../scss/dashboard.scss'
import Sidebar from './sidebar/Sidebar';
import Products from '../createProducts/Products';
import Categories from '../createCategories/Categories';
import Orders from '../Orders/Orders';
import Report from '../Report/Report';
import { GlobalState } from '../../../GlobalState';
import Notfound from '../../utils/NotFound/Notfound';
const Dashboard = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <>
        <Router>
            <Switch>
                <Route path="/admin/createProduct" component={isAdmin ? Products : Notfound}/>
                <Route path="/admin/createCategories" component={Categories}/>
                <Route path="/admin/orderList" component={Orders}/>
                <Route path="/admin/Report" component={Report}/>
            </Switch>
        </Router>
    </>
  )
}

export default Dashboard