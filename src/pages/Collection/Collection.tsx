import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IDrinkDoc } from '../../db/Drink';
import ContentWrapper from '../../layout/ContentWrapper';
import CollectionLinks from './CollectionLinks';

import './Collection.css';

const Collection: React.FC = () => {
  const location = useLocation();
  const isBaseRoute = location.pathname.endsWith('collection/') || location.pathname.endsWith('collection');

  const userId = useAppSelector((state) => state.auth.userId);

  const collectionDrinkIds = useAppSelector((state) => state.user.collection)?.map((item) => item.idDrink) as string[];

  const matchingDrinks = useAppSelector((state) => state.base.drinks).filter((drink) =>
    collectionDrinkIds.includes(drink.idDrink)
  ) as IDrinkDoc[];

  const defaultItemId = matchingDrinks.sort((a, b) => (a.strDrink as string).localeCompare(b.strDrink as string))[0]
    ?.idDrink;

  const isCollectionEmpty = !collectionDrinkIds || collectionDrinkIds.length < 1 || !defaultItemId;

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
            {isCollectionEmpty ? (
              <ContentWrapper>
                <div>
                  Add drinks to your collection from the <Link to="/drinks">Drinks page</Link>.
                </div>
              </ContentWrapper>
            ) : isBaseRoute ? (
              <Navigate to={`${userId}/${defaultItemId}`} />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Collection;
