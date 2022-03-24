import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import MyDrinks from './pages/MyDrinks/MyDrinks';
import Bottle from './pages/Drink/Drink';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import 'font-awesome/css/font-awesome.min.css';

const App: React.FC = () => {
  return (
    <div className="h-100">
      <Header />
      <Router>
        <Switch>
          <AuthRoute component={Login} path="/login" type="guest" />
          <AuthRoute component={MyDrinks} path="/mydrinks" type="private" />
          <AuthRoute component={Bottle} path="/bottle" type="private" />
          <AuthRoute component={Registration} path="/" type="guest" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
