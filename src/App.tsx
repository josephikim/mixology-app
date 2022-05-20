import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from './hooks';
import { logoutAction } from './store';
import { getKeywords, getRandomDrink } from './store/userSlice';
import Home from './pages/Home/Home';
import Drink from './pages/Drink/Drink';
import Login from './pages/Login/Login';
import SearchResults from './pages/SearchResults/SearchResults';
import Registration from './pages/Registration/Registration';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';
import CustomAlert from './components/CustomAlert';
import Collection from './pages/Collection/Collection';

import './styles/App.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const authToken = useAppSelector((state) => state.auth.accessToken);
  const keywords = useAppSelector((state) => state.user.keywords);

  useEffect(() => {
    if (!keywords || keywords.length < 1) {
      dispatch(getKeywords());
    }
  }, []);

  const randomDrink = useAppSelector((state) => state.user.randomDrink);

  useEffect(() => {
    if (!randomDrink || Object.keys(randomDrink).length === 0) {
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
      <Routes>
        <Route
          path="/collection"
          element={
            <RequireAuth redirectTo="/login">
              <Collection />
            </RequireAuth>
          }
        />
        <Route path="/search/:type/:query" element={<SearchResults />} />
        <Route path="/drink/:id" element={<Drink />} />
        <Route path="login" element={authToken ? <Navigate replace to="/" /> : <Login />} />
        <Route path="register" element={authToken ? <Navigate replace to="/" /> : <Registration />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
