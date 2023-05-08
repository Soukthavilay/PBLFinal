
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './components/user/Page';
import Admin from './components/admin/Admin';
import { DataProvider } from './GlobalState';

const App = () => {
  return (
    <DataProvider>
      <Router>
        <Switch>
          <Route path="/client" component={User} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    </DataProvider>
  );
};

export default App;
