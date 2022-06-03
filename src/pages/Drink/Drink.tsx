import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { IDrinkDoc } from '../../db/Drink';
import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
import AddCollectionItemButton from '../../components/AddCollectionItemButton';

import './Drink.css';

type UrlParams = {
  id: string;
};

const Drink: React.FC = () => {
  const { id } = useParams<UrlParams>();

  const drink = useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id) as IDrinkDoc;

  return (
    <div className="Drink">
      <Container>
        <div className="drink-cell drink-cell--1">
          <div className="drink-item">
            <ContentWrapper>
              <DrinkInfo />
              <AddCollectionItemButton idDrink={drink.idDrink} />
            </ContentWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Drink;
