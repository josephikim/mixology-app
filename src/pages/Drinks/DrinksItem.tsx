import React from 'react';
import { Badge, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IDrinkDoc } from 'db/Drink';
import DrinkTags from 'components/DrinkTags';

import './DrinksItem.css';

interface DrinksItemProps {
  drink: IDrinkDoc;
}

const DrinksItem: React.FC<DrinksItemProps> = ({ drink }) => {
  return (
    <div className="DrinksItem">
      <div className="drinksItem-cell drinksItem-cell--1">
        <div className="drinksItem-item">
          <Link to={`/drink/${drink.idDrink}`}>
            <Image src={drink.strDrinkThumb} />
          </Link>
        </div>
      </div>
      <div className="drinksItem-cell drinksItem-cell--2">
        <div className="drinksItem-item">
          <Link to={`/drink/${drink.idDrink}`}>{drink.strDrink}</Link>
        </div>
      </div>
      <div className="drinksItem-cell drinksItem-cell--3">
        <div className="drinksItem-item">
          {drink.strCategory ? <Badge bg="primary">{drink.strCategory}</Badge> : null}
        </div>
      </div>
      <div className="drinksItem-cell drinksItem-cell--4">
        <div className="drinksItem-item">
          {drink.strAlcoholic ? <Badge bg="success">{drink.strAlcoholic}</Badge> : null}
        </div>
      </div>
      <div className="drinksItem-cell drinksItem-cell--5">
        <div className="drinksItem-item">{drink.strGlass}</div>
      </div>
      <div className="drinksItem-cell drinksItem-cell--6">
        <div className="drinksItem-item">
          <DrinkTags tags={drink.strTags as string} />
        </div>
      </div>
    </div>
  );
};

export default DrinksItem;
