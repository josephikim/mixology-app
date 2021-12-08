import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Cellar from './views/Cellar/Cellar';
import Bottle from './views/Bottle/Bottle';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration';
import 'font-awesome/css/font-awesome.min.css';

const App: React.FC = () => {
  return (
    <div className="h-100">
      <Router>
        <Switch>
          <PrivateRoute component={Cellar} path="/cellar" />
          <PrivateRoute component={Bottle} path="/bottle" />
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Registration />
          </Route>
          <Route path="/" exact>
            <h2>Home</h2>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
