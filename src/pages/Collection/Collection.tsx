import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import { useAppSelector } from '../../hooks';
import { IDrinkDoc } from '../../db/Drink';
import CollectionLinks from './CollectionLinks';

import './Collection.css';

const Collection: React.FC = () => {
  const location = useLocation();
  const isDefaultRoute = location.pathname.endsWith('collection/') || location.pathname.endsWith('collection');

  const userId = useAppSelector((state) => state.auth.userId);

  const collectionDrinkIds = useAppSelector((state) => state.user.collection)?.map((item) => item.idDrink) as string[];

  const matchingDrinks = collectionDrinkIds.map((id) =>
    useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id)
  ) as IDrinkDoc[];

  const clonedMatchingDrinks = cloneDeep(matchingDrinks);

  const defaultItemId = clonedMatchingDrinks.sort((a, b) =>
    (a.strDrink as string).localeCompare(b.strDrink as string)
  )[0].idDrink;

  return (
    <div className="Collection">
      <Container>
        <div className="collection-cell collection-cell--1">
          <div className="collection-item">
            <CollectionLinks drinks={matchingDrinks} />
          </div>
        </div>
        <div className="collection-cell collection-cell--2">
          <div className="collection-item">
            {isDefaultRoute ? <Navigate to={`${userId}/${defaultItemId}`} /> : <Outlet />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Collection;
