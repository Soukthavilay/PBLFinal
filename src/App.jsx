
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './components/user/Page';
import Admin from './components/admin/Admin';
import { DataProvider } from './GlobalState';
import TopHeader from './components/utils/top-header/TopHeader';
import Header from './components/utils/header/Header';
import Filter from './components/utils/filter/Filter';

const App = () => {
  return (
    <DataProvider>
      <Router>
        {/* <Switch> */}
          {/* <Route path="/" component={User} /> */}
          {/* <Route path="/client" component={User} /> */}
          {/* <Route path="/admin" component={Admin} /> */}
        {/* </Switch> */}
        <TopHeader/>
        <Header/>
        <Filter/>
        <User/>
      </Router>
    </DataProvider>
  );
};

export default App;
