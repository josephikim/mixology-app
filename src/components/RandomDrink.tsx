import React from 'react';
import { Row, Col, Badge, Image } from 'react-bootstrap';

import { useAppSelector } from '../hooks';
import DrinkTags from './DrinkTags';
import DrinkIngredients from './DrinkIngredients';
import DrinkInstructions from './DrinkInstructions';

import '../styles/RandomDrink.css';

const RandomDrink: React.FC = () => {
  const drink = useAppSelector((state) => state.base.randomDrink);

  if (!drink || drink == undefined) return null;

  const includesTags = drink.strTags && drink.strTags.length > 0;

  return (
    <div className="RandomDrink">
      <Row>
        <Col>
          <strong>Random Drink</strong>
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
          <DrinkInstructions text={drink.strInstructions as string} />
        </Col>
      </Row>

      {includesTags ? (
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
