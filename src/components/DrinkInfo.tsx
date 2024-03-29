import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { useAppSelector } from 'hooks';
import ContentWrapper from 'layout/ContentWrapper';
import DrinkCategoryTags from './DrinkCategoryTags';
import DrinkAlcoholTags from './DrinkAlcoholTags';
import DrinkTags from './DrinkTags';
import DrinkIngredients from './DrinkIngredients';
import DrinkInstructions from './DrinkInstructions';
import Youtube from './Youtube';

import 'styles/DrinkInfo.css';

type UrlParams = {
  id: string;
};

const DrinkInfo: React.FC = () => {
  const { id } = useParams<UrlParams>();

  const matchingDrink = useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id);

  if (!matchingDrink || !matchingDrink.idDrink) {
    return (
      <div className="Drink">
        <Container>
          <Row>
            <Col>
              <ContentWrapper>
                <h6>Drink not found...</h6>
              </ContentWrapper>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="DrinkInfo">
      <Container>
        <div className="drink-info-cell drink-info-cell--1">
          <div className="drink-info-item">
            <Row>
              <Col md={6}>
                <h6>CATEGORY</h6>
              </Col>

              <Col md={6}>
                {matchingDrink.strCategory && <DrinkCategoryTags category={matchingDrink.strCategory} />}
              </Col>
            </Row>
          </div>
        </div>
        <div className="drink-info-cell drink-info-cell--2">
          <div className="drink-info-item">
            <Row>
              <Col md={6}>
                <h6>ALCOHOL CONTENT</h6>
              </Col>

              <Col md={6}>
                {matchingDrink.strAlcoholic && <DrinkAlcoholTags alcohol={matchingDrink.strAlcoholic} />}
              </Col>
            </Row>
          </div>
        </div>
        <div className="drink-info-cell drink-info-cell--3">
          <div className="drink-info-item">
            <Row>
              <Col md={6}>
                <h6>SERVING GLASS</h6>
              </Col>

              <Col md={6}>
                <span>{matchingDrink.strGlass}</span>
              </Col>
            </Row>
          </div>
        </div>
        <div className="drink-info-cell drink-info-cell--4">
          <div className="drink-info-item">
            <Row>
              <Col md={6}>
                <h6>IBA TAGS</h6>
              </Col>

              <Col md={6}>{matchingDrink.strTags && <DrinkTags tags={matchingDrink.strTags} />}</Col>
            </Row>
          </div>
        </div>
        <div className="drink-info-cell drink-info-cell--5">
          <div className="drink-info-item">
            <h6>RECIPE</h6>
            <ContentWrapper>
              <Row>
                <Col>
                  <h6>Ingredients</h6>
                  <DrinkIngredients data={matchingDrink} />
                </Col>

                <Col>
                  <h6>Instructions</h6>
                  <DrinkInstructions text={matchingDrink.strInstructions as string} />
                </Col>
              </Row>
            </ContentWrapper>
          </div>
        </div>
        <div className="drink-info-cell drink-info-cell--6">
          <div className="drink-info-item">
            <h6>VIDEOS</h6>
            <ContentWrapper>
              <Youtube idDrink={matchingDrink.idDrink} videos={matchingDrink.youtubeVideos} />
            </ContentWrapper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DrinkInfo;
