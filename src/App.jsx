
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './components/user/Page';
import Admin from './components/admin/Admin';
import { DataProvider } from './GlobalState';
import TopHeader from './components/utils/top-header/TopHeader';
import Header from './components/utils/header/Header';
import Filter from './components/utils/filter/Filter';
import { Footer } from './components/utils/footer/Footer';
import Loading from './components/utils/Loading/Loading';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [laoding,setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); 
  // }, []);
  
  // if (laoding) {
  //   return <Loading/>
  // }
  return (
    <DataProvider>
      <Router>
        {/* <Switch> */}
          {/* <Route path="/" component={User} /> */}
          {/* <Route path="/client" component={User} /> */}
          {/* <Route path="/admin" component={Admin} /> */}
        {/* </Switch> */}
        <div className="header">
          <TopHeader/>
          <Header/>
        </div>
        {/* <Filter/> */}
        <div className="page-content">
          <User/>
        </div>
        <Footer/>
      </Router>
    </DataProvider>
  );
};

export default App;
