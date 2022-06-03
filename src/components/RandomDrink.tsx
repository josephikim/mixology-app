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
      <h6>Random Drink</h6>

      <Row>
        <Col>
          <h4>{drink.strDrink}</h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <Image src={drink.strDrinkThumb} rounded />
        </Col>
      </Row>

      <Row>
        <div className="flex-container">
          <Col>
            <h6>Category</h6>
          </Col>
          <Col>{drink.strAlcoholic ? <Badge bg="secondary">{drink.strAlcoholic}</Badge> : null}</Col>
        </div>
      </Row>

      <Row>
        <div className="flex-container">
          <Col>
            <h6>Serving Glass</h6>
          </Col>
          <Col>{drink.strGlass}</Col>
        </div>
      </Row>

      <h6>Ingredients</h6>

      <Row>
        <Col>
          <DrinkIngredients data={drink} />
        </Col>
      </Row>

      <h6>Instructions</h6>

      <Row>
        <Col>
          <DrinkInstructions text={drink.strInstructions as string} />
        </Col>
      </Row>

      {includesTags ? (
        <Row>
          <div className="flex-container">
            <Col>
              <h6>Tags</h6>
            </Col>
            <Col>
              <DrinkTags tags={drink.strTags as string} />
            </Col>
          </div>
        </Row>
      ) : null}
    </div>
  );
};

export default RandomDrink;
