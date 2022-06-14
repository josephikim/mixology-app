import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from './hooks';
import { logoutAction } from './store';
import { getKeywords, getRandomDrink, getDrinks } from './store/baseSlice';
import Home from './pages/Home/Home';
import Drinks from './pages/Drinks/Drinks';
import Drink from './pages/Drink/Drink';
import Login from './pages/Login/Login';
import SearchResults from './pages/SearchResults/SearchResults';
import Registration from './pages/Registration/Registration';
import Collection from './pages/Collection/Collection';
import CollectionItem from './pages/Collection/CollectionItem';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';
import CustomAlert from './components/CustomAlert';

import './styles/App.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.userId);
  const alerts = useAppSelector((state) => state.alert.alerts);
  const errorType = useAppSelector((state) => state.user.errorType);
  const keywords = useAppSelector((state) => state.base.keywords);
  const randomDrink = useAppSelector((state) => state.base.randomDrink);
  const drinks = useAppSelector((state) => state.base.drinks);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      alert('Access error occurred. Please login again.');
      dispatch(logoutAction());
    }
  }, [errorType]);

  useEffect(() => {
    if (!keywords || keywords.length < 1) {
      dispatch(getKeywords());
    }
  }, [keywords]);

  useEffect(() => {
    if (!randomDrink || Object.keys(randomDrink).length === 0) {
      dispatch(getRandomDrink());
    }
  }, [randomDrink]);

  useEffect(() => {
    if (!drinks || drinks.length < 1) {
      dispatch(getDrinks());
    }
  }, [drinks]);

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
        >
          {userId && (
            <Route
              path={`${userId}/:id`}
              element={
                <RequireAuth redirectTo="/login">
                  <CollectionItem />
                </RequireAuth>
              }
            />
          )}
          <Route path="*" element={<Navigate to="/collection" />} />
        </Route>
        <Route path="/search/:type/:query" element={<SearchResults />} />
        <Route path="/drink/:id" element={<Drink />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="login" element={authToken ? <Navigate to="/" replace /> : <Login />} />
        <Route path="register" element={authToken ? <Navigate to="/" replace /> : <Registration />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
