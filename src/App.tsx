import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import Collection from './pages/Collection/Collection';
import Search from './pages/Search/Search';
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
          <AuthRoute component={Collection} path="/collection" type="private" />
          <AuthRoute component={Search} path="/search" type="private" />
          <AuthRoute component={Registration} path="/" type="guest" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
