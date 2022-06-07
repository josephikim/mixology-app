import React, { useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { IDrinkDoc } from '../../db/Drink';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getDrink } from '../../store/baseSlice';
import DrinkInfo from '../../components/DrinkInfo';
import AddCollectionItemButton from '../../components/AddCollectionItemButton';

import './Drink.css';

type UrlParams = {
  id: string;
};

const Drink: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<UrlParams>();

  const drink = useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id) as IDrinkDoc;

  useEffect(() => {
    if (!drink || Object.keys(drink).length < 1) {
      dispatch(getDrink(id as string));
    }
  }, []);

  return (
    <div className="Drink">
      {drink ? (
        <Container>
          <div className="drink-cell drink-cell--1">
            <div className="drink-item">
              <h4 className="drink-info-item-heading">{drink.strDrink}</h4>
              <Image width={250} height={250} src={drink.strDrinkThumb} fluid />
              <AddCollectionItemButton idDrink={drink.idDrink} />
            </div>
          </div>
          <div className="drink-cell drink-cell--2">
            <div className="drink-item">
              <DrinkInfo />
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="drink-cell drink-cell--1">
            <div className="drink-item">Loading drink...</div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Drink;
