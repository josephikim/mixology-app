import React from 'react';
import { Row, Col, Badge, Image, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getRandomDrink } from '../store/baseSlice';
import DrinkTags from './DrinkTags';
import DrinkIngredients from './DrinkIngredients';
import DrinkInstructions from './DrinkInstructions';

import '../styles/RandomDrink.css';

const RandomDrink: React.FC = () => {
  const dispatch = useAppDispatch();
  const drink = useAppSelector((state) => state.base.randomDrink);
  const status = useAppSelector((state) => state.base.status);

  if (!drink || drink == undefined) return null;

  const includesTags = drink.strTags && drink.strTags.length > 0;

  const handleClick = () => {
    dispatch(getRandomDrink());
  };

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <Row>
          <Col>
            <h6>Loading drink...</h6>
          </Col>
        </Row>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <div className="RandomDrink">
      <Row>
        <div className="flex-container">
          <Col>
            <h6>Random Drink</h6>
          </Col>
          <Col>
            <Button onClick={handleClick} className="flex-container-btn" variant="success">
              Refresh
            </Button>
          </Col>
        </div>
      </Row>
      {renderContent()}
    </div>
  );
};

export default RandomDrink;
