import React from 'react';
import { Badge, Col, Card } from 'react-bootstrap';

import { addDrink } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISearchResult } from '../../types';

import './SearchResultCard.css';

interface SearchResultCardProps {
  data: ISearchResult;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.user.drinks);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const idDrink = event.currentTarget.id;
    if (!idDrink) return;

    dispatch(addDrink(idDrink));
  };

  const matchesSavedDrink = drinks.some((savedDrink) => savedDrink.idDrinkApi === data.idDrink);

  return (
    <Col className="SearchResultCard">
      <Card>
        <Card.Img variant="top" src={data.strDrinkThumb} />
        <Card.Body id="description">
          <Card.Title>{data.strDrink}</Card.Title>
          <Card.Text>{data.strInstructions}</Card.Text>
        </Card.Body>
        <Card.Body id="alcohol">
          {data.strAlcoholic ? <Badge bg="secondary">{data.strAlcoholic}</Badge> : null}
        </Card.Body>
        <Card.Body id="actions">
          {matchesSavedDrink ? (
            <Card.Text>Added</Card.Text>
          ) : (
            <Card.Link id={data.idDrink} onClick={(e: React.MouseEvent<HTMLElement>): void => handleClick(e)}>
              Add to collection
            </Card.Link>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SearchResultCard;
