import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../login-register/Login';
import TopHeader from '../utils/top-header/TopHeader';
import Header from '../utils/header/Header';
import Banner from './banner/Banner';
import Filter from '../utils/filter/Filter';
import Register from '../login-register/Register';

const Page = () => {
  return (
    <Router>
      <TopHeader/>
      <Header/>
      <Filter/>
      <Switch>
        <Route path="/client/login" component={Login} />
        <Route path="/client/register" component={Register} />
        <Route path="/client" component={Banner} />
      </Switch>
    </Router>
  )
}

export default Page