import React from 'react';
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import { useAppSelector } from '../../hooks';
import { IDrinkDoc } from '../../db/Drink';
import CollectionLinks from './CollectionLinks';

import './Collection.css';

const Collection: React.FC = () => {
  const collection = useAppSelector((state) => state.user.collection);
  const clonedCollection = cloneDeep(collection);
  const collectionDrinkIds = clonedCollection?.map((item) => item.idDrink) as string[];

  const matchingDrinks = collectionDrinkIds.map((id) =>
    useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id)
  ) as IDrinkDoc[];

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
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Collection;
