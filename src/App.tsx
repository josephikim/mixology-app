import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import Collection from './pages/Collection/Collection';
import Search from './pages/Search/Search';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <AuthRoute component={Login} path="/login" authType="guest" />
          <AuthRoute component={Collection} path="/collection" authType="private" />
          <AuthRoute component={Search} path="/search" authType="private" />
          <AuthRoute component={Registration} path="/" authType="guest" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
