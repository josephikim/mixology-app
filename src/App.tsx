import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from './hooks';
import { logoutAction } from './store';
import { getKeywords, getRandomDrink } from './store/userSlice';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import CustomAlert from './components/CustomAlert';
import Collection from './pages/Collection/Collection';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Registration from './pages/Registration/Registration';

import './styles/App.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const keywords = useAppSelector((state) => state.user.keywords);

  useEffect(() => {
    if (!keywords || keywords.length < 1) {
      dispatch(getKeywords());
    }
  }, []);

  const randomDrink = useAppSelector((state) => state.user.randomDrink);

  useEffect(() => {
    if (!randomDrink || randomDrink === undefined) {
      dispatch(getRandomDrink());
    }
  }, []);

  const errorType = useAppSelector((state) => state.user.errorType);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      alert('Access error occurred. Please login again.');
      dispatch(logoutAction());
    }
  }, [errorType]);

  const alerts = useAppSelector((state) => state.alert.alerts);

  return (
    <div className="App">
      <Header />
      {alerts.map((alert) => (
        <CustomAlert key={alert.id} data={alert} />
      ))}
      <Router>
        <Switch>
          <AuthRoute component={Collection} path="/collection" authType="private" />
          <AuthRoute component={Search} path="/search" authType="private" />
          <AuthRoute component={Login} path="/login" authType="guest" />
          <AuthRoute component={Registration} path="/register" authType="guest" />
          <AuthRoute component={Home} path="/" authType="guest" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
