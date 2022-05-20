import React from 'react';
import { Badge, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { addCollectionItem } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IDrinkDoc } from '../../db/Drink';

import './SearchResultItem.css';

interface SearchResultItemProps {
  drink: IDrinkDoc;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ drink }) => {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const collection = useAppSelector((state) => state.user.collection) as IDrinkDoc[];

  let collectionIncludesSearchResult = false;

  if (collection) {
    collectionIncludesSearchResult = collection.some((item) => item.idDrink === drink.idDrink);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const idDrink = event.currentTarget.id;
    if (!idDrink) return;

    if (authToken) {
      dispatch(addCollectionItem(idDrink));
    } else {
      alert('Please login to manage your collection.');
    }
  };

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
          {drink.strAlcoholic ? <Badge bg="secondary">{drink.strAlcoholic}</Badge> : null}
        </div>
      </div>
      <div className="search-result-item-cell search-result-item-cell--4">
        <div className="search-result-item-item">
          <div className="btn">
            {collectionIncludesSearchResult ? (
              <Button>
                Added <i className="las la-check"></i>
              </Button>
            ) : (
              <Button id={drink.idDrink} onClick={(e: React.MouseEvent<HTMLElement>): void => handleClick(e)}>
                Add to collection
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
