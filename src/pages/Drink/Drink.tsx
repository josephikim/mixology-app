import React, { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { IDrinkDoc } from 'db/Drink';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getDrink } from 'store/baseSlice';
import DrinkInfo from 'components/DrinkInfo';
import AddCollectionItemButton from 'components/AddCollectionItemButton';

import './Drink.css';

type UrlParams = {
  id: string;
};

const Drink: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<UrlParams>();

  const [isDrinkLoadingSuccess, setIsDrinkLoadingSuccess] = useState(false);
  const [isDrinkLoadingFail, setIsDrinkLoadingFail] = useState(false);

  const drink = useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id) as IDrinkDoc;

  useEffect(() => {
    const handleGetDrink = async () => {
      const resultAction = await dispatch(getDrink(id as string));

      if (resultAction.type === 'base/getDrink/fulfilled') {
        setIsDrinkLoadingSuccess(true);
        setIsDrinkLoadingFail(false);
      } else {
        setIsDrinkLoadingSuccess(false);
        setIsDrinkLoadingFail(true);
      }
    };

    if (!drink || !drink.idDrink) {
      handleGetDrink();
    } else {
      setIsDrinkLoadingSuccess(true);
      setIsDrinkLoadingFail(false);
    }
  }, []);

  const renderContent = () => {
    if (isDrinkLoadingSuccess) {
      return (
        <Container>
          <div className="drink-cell drink-cell--1">
            <div className="drink-item">
              <h4 className="drink-item-heading">{drink.strDrink}</h4>
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
      );
    } else {
      return (
        <Container className="full-width">
          <div className="drink-cell drink-cell--1">
            <div className="drink-item">
              <p>Error loading drink!</p>
            </div>
          </div>
        </Container>
      );
    }
  };

  const isDrinkLoaded = isDrinkLoadingSuccess || isDrinkLoadingFail;

  return (
    <div className="Drink">
      {isDrinkLoaded ? (
        renderContent()
      ) : (
        <Container className="full-width">
          <div className="drink-cell drink-cell--1">
            <div className="drink-item">
              <p>Loading drink...</p>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Drink;
