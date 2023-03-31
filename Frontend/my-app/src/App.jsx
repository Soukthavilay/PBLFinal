import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from './components/admin/AdminPage';
import UserPage from './components/user/UserPage';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path='/admin'>
            <AdminPage/>
          </Route>
          <Route path='/user'>
            <UserPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
