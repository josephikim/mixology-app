import React from 'react';
import { Row, Col, Badge, Image } from 'react-bootstrap';

import { useAppSelector } from '../hooks';
import DrinkTags from './DrinkTags';
import DrinkIngredients from './DrinkIngredients';
import DrinkInstructions from './DrinkInstructions';

import '../styles/RandomDrink.css';

const RandomDrink: React.FC = () => {
  const drink = useAppSelector((state) => state.base.randomDrink);

  if (!drink || drink === undefined) return null;

  return (
    <div className="RandomDrink">
      <Row>
        <Col>
          <label>Random Drink</label>
        </Col>
      </Row>

      <Row>
        <Col>
          <Image src={drink.strDrinkThumb} rounded />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Name:</strong>
        </Col>
        <Col md={8}>{drink.strDrink}</Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Category:</strong>
        </Col>
        <Col md={8}>{drink.strAlcoholic ? <Badge bg="secondary">{drink.strAlcoholic}</Badge> : null}</Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Glass:</strong>
        </Col>
        <Col md={8}>{drink.strGlass}</Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Ingredients:</strong>
        </Col>
        <Col md={8}>
          <DrinkIngredients data={drink} />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Instructions:</strong>
        </Col>
        <Col md={8}>
          <DrinkInstructions instructions={drink.strInstructions as string} />
        </Col>
      </Row>

      {drink.strTags ? (
        <Row>
          <Col md={4}>
            <strong>Tags:</strong>
          </Col>
          <Col md={8}>
            <DrinkTags tags={drink.strTags as string} />
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default RandomDrink;
