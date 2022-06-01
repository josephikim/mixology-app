import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import { useAppSelector } from '../../hooks';

import './Drinks.css';

const Drinks: React.FC = () => {
  const drinks = useAppSelector((state) => state.base.drinks);
  const drinksClone = cloneDeep(drinks);
  const drinksSorted = drinksClone.sort((a, b) => (a.strDrink as string).localeCompare(b.strDrink as string));

  return (
    <div className="Drinks">
      <Container>
        <div className="DrinksWrapper">
          <Row>
            <Col>
              <strong>All drinks</strong>
            </Col>
          </Row>
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
      </Container>
    </div>
  );
};

export default Drinks;
