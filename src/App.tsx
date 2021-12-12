import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import Cellar from './views/Cellar/Cellar';
import Bottle from './views/Bottle/Bottle';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration';
import 'font-awesome/css/font-awesome.min.css';

const App: React.FC = () => {
  return (
    <div className="h-100">
      <Header />
      <Router>
        <Switch>
          <AuthRoute component={Login} path="/login" type="guest" />
          <AuthRoute component={Cellar} path="/cellar" type="private" />
          <AuthRoute component={Bottle} path="/bottle" type="private" />
          <AuthRoute component={Registration} path="/" type="guest" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
