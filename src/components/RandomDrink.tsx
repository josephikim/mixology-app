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
            <h5>Loading drink...</h5>
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
                <h5>Category</h5>
              </Col>
              <Col>{drink.strAlcoholic ? <Badge bg="secondary">{drink.strAlcoholic}</Badge> : null}</Col>
            </div>
          </Row>
          {includesTags ? (
            <Row>
              <div className="flex-container">
                <Col>
                  <h5>IBA Tags</h5>
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
                <h5>Serving Glass</h5>
              </Col>
              <Col>{drink.strGlass}</Col>
            </div>
          </Row>

          <h5>Ingredients</h5>

          <Row>
            <Col>
              <DrinkIngredients data={drink} />
            </Col>
          </Row>

          <h5>Instructions</h5>

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
            <h5>Random Drink</h5>
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
