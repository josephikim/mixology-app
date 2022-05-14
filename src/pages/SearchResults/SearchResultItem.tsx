import React from 'react';
import { Badge, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { addDrink } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISearchResult } from '../../types';

import './SearchResultItem.css';

interface SearchResultItemProps {
  data: ISearchResult;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.user.drinks);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const idDrink = event.currentTarget.id;
    if (!idDrink) return;

    dispatch(addDrink(idDrink));
  };

  const matchesSavedDrink = drinks.some((savedDrink) => savedDrink.idDrinkApi === data.idDrink);

  return (
    <div className="SearchResultItem">
      <div className="search-result-item-cell search-result-item-cell--1">
        <div className="search-result-item-item">
          <Link to={`/drink/${data.idDrink}`}>
            <Image src={data.strDrinkThumb} />
          </Link>
        </div>
      </div>
      <div className="search-result-item-cell search-result-item-cell--2">
        <div className="search-result-item-item">
          <Link to={`/drink/${data.idDrink}`}>{data.strDrink}</Link>
        </div>
      </div>
      <div className="search-result-item-cell search-result-item-cell--3">
        <div className="search-result-item-item">
          {data.strAlcoholic ? <Badge bg="secondary">{data.strAlcoholic}</Badge> : null}
        </div>
      </div>
      <div className="search-result-item-cell search-result-item-cell--4">
        <div className="search-result-item-item">
          <div className="btn">
            {matchesSavedDrink ? (
              <Button>
                Added <i className="las la-check"></i>
              </Button>
            ) : (
              <Button id={data.idDrink} onClick={(e: React.MouseEvent<HTMLElement>): void => handleClick(e)}>
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
