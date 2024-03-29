import React from 'react';
import { Row, Col, Badge, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <Col>
              <Image src={drink.strDrinkThumb} rounded />
            </Col>
          </Row>

          <Row>
            <div className="flex-container content-heading">
              <Col>
                <h4>{drink.strDrink}</h4>
                <Link to={`/drink/${drink.idDrink}`}>view details</Link>
              </Col>
            </div>
          </Row>

          {drinkIncludesCategory ? (
            <Row>
              <div className="flex-container">
                <Col md={7}>
                  <h6>Category</h6>
                </Col>
                <Col md={5}>{drink.strCategory ? <Badge bg="primary">{drink.strCategory}</Badge> : null}</Col>
              </div>
            </Row>
          ) : null}

          <Row>
            <div className="flex-container">
              <Col md={7}>
                <h6>Alcohol Content</h6>
              </Col>
              <Col md={5}>{drink.strAlcoholic ? <Badge bg="success">{drink.strAlcoholic}</Badge> : null}</Col>
            </div>
          </Row>

          {drinkIncludesTags ? (
            <Row>
              <div className="flex-container">
                <Col md={7}>
                  <h6>IBA Tags</h6>
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
                <h6>Serving Glass</h6>
              </Col>
              <Col md={5}>{drink.strGlass}</Col>
            </div>
          </Row>

          <h6>Ingredients</h6>

          <Row>
            <div className="flex-container">
              <Col>
                <DrinkIngredients data={drink} />
              </Col>
            </div>
          </Row>

          <h6>Instructions</h6>

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
