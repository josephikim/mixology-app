import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IDrinkDoc } from 'db/Drink';
import AddCollectionItemButton from 'components/AddCollectionItemButton';

import './SearchResultItem.css';

interface SearchResultItemProps {
  drink: IDrinkDoc;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ drink }) => {
  return (
    <div className="SearchResultItem">
      <div className="search-result-item-cell search-result-item-cell--1">
        <div className="search-result-item-item">
          <Link to={`/drink/${drink.idDrink}`}>
            <Image src={drink.strDrinkThumb} />
          </Link>
        </div>
      </div>
      <div className="search-result-item-cell search-result-item-cell--2">
        <div className="search-result-item-item">
          <Link to={`/drink/${drink.idDrink}`}>{drink.strDrink}</Link>
        </div>
      </div>
      <div className="search-result-item-cell search-result-item-cell--3">
        <div className="search-result-item-item">
          <AddCollectionItemButton idDrink={drink.idDrink} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
