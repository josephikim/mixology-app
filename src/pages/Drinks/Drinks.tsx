import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { IDrinkDoc } from '../../db/Drink';

import './Drinks.css';

const Drinks: React.FC = () => {
  const drinks = useAppSelector((state) => state.base.drinks) as IDrinkDoc[];

  const drinksSorted = drinks.sort((a, b) => (a.strDrink as string).localeCompare(b.strDrink as string));

  return (
    <div className="Drinks">
      <Container>
        <div className="drinks-cell drinks-cell--1">
          <div className="drinks-item">
            <Row>
              <Col>
                <label>All drinks</label>
              </Col>
            </Row>
          </div>
        </div>
        <div className="drinks-cell drinks-cell--2">
          <div className="drinks-item">
            <Row>
              {drinksSorted.map((drink) => {
                return (
                  <Col key={drink.idDrink} md={3}>
                    <Link to={`/drink/${drink.idDrink}`}>{drink.strDrink}</Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Drinks;
