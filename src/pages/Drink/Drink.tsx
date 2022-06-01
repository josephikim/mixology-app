import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkCategoryTags from '../../components/DrinkCategoryTags';
import DrinkAlcoholTags from '../../components/DrinkAlcoholTags';
import DrinkTags from '../../components/DrinkTags';
import DrinkIngredients from '../../components/DrinkIngredients';
import DrinkInstructions from '../../components/DrinkInstructions';
import Youtube from '../../components/Youtube';
import AddCollectionItemButton from '../../components/AddCollectionItemButton';

import './Drink.css';

type UrlParams = {
  id: string;
};

const Drink: React.FC = () => {
  const { id } = useParams<UrlParams>();

  const matchingDrink = useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id);

  if (!matchingDrink || !matchingDrink.idDrink) {
    return (
      <div className="Drink">
        <Container>
          <Row>
            <Col>
              <ContentWrapper>
                <h6>Drink not...</h6>
              </ContentWrapper>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="Drink">
      <Container>
        <div className="drink-cell drink-cell--1">
          <div className="drink-item">
            <h4 className="drink-item-heading">{matchingDrink.strDrink}</h4>
            <Image width={250} height={250} src={matchingDrink.strDrinkThumb} fluid />
            <AddCollectionItemButton idDrink={matchingDrink.idDrink} />
          </div>
        </div>
        <div className="drink-cell drink-cell--2">
          <div className="drink-item">
            <Row>
              <Col md={5}>
                <h5>Category</h5>
              </Col>

              <Col md={7}>
                {matchingDrink.strCategory && <DrinkCategoryTags category={matchingDrink.strCategory} />}
              </Col>
            </Row>
          </div>
        </div>
        <div className="drink-cell drink-cell--3">
          <div className="drink-item">
            <Row>
              <Col md={5}>
                <h5>Alcohol Content</h5>
              </Col>

              <Col md={7}>
                {matchingDrink.strAlcoholic && <DrinkAlcoholTags alcohol={matchingDrink.strAlcoholic} />}
              </Col>
            </Row>
          </div>
        </div>
        <div className="drink-cell drink-cell--4">
          <div className="drink-item">
            <Row>
              <Col md={5}>
                <h5>Tags</h5>
              </Col>

              <Col md={7}>{matchingDrink.strTags && <DrinkTags tags={matchingDrink.strTags} />}</Col>
            </Row>
          </div>
        </div>
        <div className="drink-cell drink-cell--5">
          <div className="drink-item">
            <Row>
              <Col md={5}>
                <h5>Serving Glass</h5>
              </Col>

              <Col md={7}>
                <p>{matchingDrink.strGlass}</p>
              </Col>
            </Row>
          </div>
        </div>
        <div className="drink-cell drink-cell--6">
          <div className="drink-item">
            <h5>Recipe</h5>
            <ContentWrapper>
              <Row>
                <Col>
                  <h6>Ingredients:</h6>
                  <DrinkIngredients data={matchingDrink} />
                </Col>

                <Col>
                  <h6>Instructions:</h6>
                  <DrinkInstructions text={matchingDrink.strInstructions as string} />
                </Col>
              </Row>
            </ContentWrapper>
          </div>
        </div>
        <div className="drink-cell drink-cell--7">
          <div className="drink-item">
            <h5>Videos</h5>
            <ContentWrapper>
              <Youtube videos={matchingDrink.youtubeVideos} />
            </ContentWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Drink;
