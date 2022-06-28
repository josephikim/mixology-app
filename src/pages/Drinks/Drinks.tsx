import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import { useAppSelector, useAppDispatch } from 'hooks';
import { getDrinks } from 'store/baseSlice';
import DrinksItemHeader from './DrinksItemHeader';
import DrinksItem from './DrinksItem';

import './Drinks.css';

const Drinks: React.FC = () => {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.base.drinks);
  const drinksClone = cloneDeep(drinks);
  const isDrinksLoaded = drinksClone?.length && drinksClone.length > 0;

  useEffect(() => {
    if (!isDrinksLoaded) {
      dispatch(getDrinks());
    }
  }, []);

  const renderContent = () => {
    if (isDrinksLoaded) {
      const drinksSorted = drinksClone.sort((a, b) => (a.strDrink as string).localeCompare(b.strDrink as string));
      return (
        <div className="drinks-wrapper">
          <DrinksItemHeader />
          {drinksSorted.map((drink) => {
            return <DrinksItem key={drink.idDrink} drink={drink} />;
          })}
        </div>
      );
    } else {
      return (
        <div className="drinks-wrapper">
          <h4>Loading drinks...</h4>
        </div>
      );
    }
  };

  return (
    <div className="Drinks">
      <Container>{renderContent()}</Container>
    </div>
  );
};

export default Drinks;
