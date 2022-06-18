import React from 'react';
import { Row, Col, Badge, Image, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getRandomDrink } from 'store/baseSlice';
import DrinkTags from './DrinkTags';
import DrinkIngredients from './DrinkIngredients';
import DrinkInstructions from './DrinkInstructions';

import 'styles/RandomDrink.css';

const RandomDrink: React.FC = () => {
  const dispatch = useAppDispatch();
  const drink = useAppSelector((state) => state.base.randomDrink);

  const isDrinkLoaded = !!drink?.idDrink;

  const drinkIncludesCategory = drink.strCategory && drink.strCategory.length > 0;
  const drinkIncludesTags = drink.strTags && drink.strTags.length > 0;

  const handleClick = () => {
    dispatch(getRandomDrink());
  };

  const renderContent = () => {
    if (isDrinkLoaded) {
      return (
        <>
          <Row>
            <div className="flex-container content-heading">
              <Col>
                <h4>{drink.strDrink}</h4>
                <a href={`/drink/${drink.idDrink}`}>view details</a>
              </Col>
            </div>
          </Row>

          <Row>
            <Col>
              <Image src={drink.strDrinkThumb} rounded />
            </Col>
          </Row>

          {drinkIncludesCategory ? (
            <Row>
              <div className="flex-container">
                <Col md={7}>
                  <h5>Category</h5>
                </Col>
                <Col md={5}>{drink.strCategory ? <Badge bg="success">{drink.strCategory}</Badge> : null}</Col>
              </div>
            </Row>
          ) : null}

          <Row>
            <div className="flex-container">
              <Col md={7}>
                <h5>Alcohol Content</h5>
              </Col>
              <Col md={5}>{drink.strAlcoholic ? <Badge bg="success">{drink.strAlcoholic}</Badge> : null}</Col>
            </div>
          </Row>

          {drinkIncludesTags ? (
            <Row>
              <div className="flex-container">
                <Col md={7}>
                  <h5>IBA Tags</h5>
                </Col>
                <Col md={5}>
                  <DrinkTags tags={drink.strTags as string} />
                </Col>
              </div>
            </Row>
          ) : null}

          <Row>
            <div className="flex-container">
              <Col md={7}>
                <h5>Serving Glass</h5>
              </Col>
              <Col md={5}>{drink.strGlass}</Col>
            </div>
          </Row>

          <h5>Ingredients</h5>

          <Row>
            <div className="flex-container">
              <Col>
                <DrinkIngredients data={drink} />
              </Col>
            </div>
          </Row>

          <h5>Instructions</h5>

          <Row>
            <div className="flex-container">
              <Col>
                <DrinkInstructions text={drink.strInstructions as string} />
              </Col>
            </div>
          </Row>
        </>
      );
    } else {
      return (
        <Row>
          <Col>
            <h5>Loading drink...</h5>
          </Col>
        </Row>
      );
    }
  };

  return (
    <div className="RandomDrink">
      <Row className="heading-container">
        <div className="flex-container">
          <Col>
            <h5>Featured Drink</h5>
          </Col>
          <Col>
            <Button onClick={handleClick} variant="primary">
              Randomize
            </Button>
          </Col>
        </div>
      </Row>
      <Row className="cont-container">
        <Col>{renderContent()}</Col>
      </Row>
    </div>
  );
};

export default RandomDrink;
