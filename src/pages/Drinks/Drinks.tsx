import React from 'react';
import { Container } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import { useAppSelector } from 'hooks';
import DrinksItemHeader from './DrinksItemHeader';
import DrinksItem from './DrinksItem';

import './Drinks.css';

const Drinks: React.FC = () => {
  const drinks = useAppSelector((state) => state.base.drinks);
  const drinksClone = cloneDeep(drinks);
  const drinksSorted = drinksClone.sort((a, b) => (a.strDrink as string).localeCompare(b.strDrink as string));

  return (
    <div className="Drinks">
      <Container>
        <div className="drinks-wrapper">
          <DrinksItemHeader />
          {drinksSorted.map((drink) => {
            return <DrinksItem key={drink.idDrink} drink={drink} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default Drinks;
