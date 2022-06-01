import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Tabs, Tab, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
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
                <h6>Error loading drink...</h6>
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
        <Tabs defaultActiveKey="info">
          <Tab eventKey="info" title="Info">
            <Row>
              <Col md={4}>
                <ContentWrapper>
                  <Image width={250} height={250} src={matchingDrink.strDrinkThumb} fluid />
                </ContentWrapper>
              </Col>
              <Col md={4}>
                <ContentWrapper>
                  <DrinkInfo data={matchingDrink} />
                </ContentWrapper>
              </Col>
              <Col md={4}>
                <ContentWrapper>
                  <AddCollectionItemButton idDrink={matchingDrink.idDrink} />
                </ContentWrapper>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="recipe" title="Recipe">
            <Row>
              <Col md={4}>
                <ContentWrapper>
                  <Image width={250} height={250} src={matchingDrink.strDrinkThumb} fluid />
                </ContentWrapper>
              </Col>
              <Col md={4}>
                <ContentWrapper>
                  <h6>Ingredients:</h6>
                  <DrinkIngredients data={matchingDrink} />
                </ContentWrapper>
              </Col>
              <Col md={4}>
                <ContentWrapper>
                  <h6>Instructions:</h6>
                  <DrinkInstructions text={matchingDrink.strInstructions as string} />
                </ContentWrapper>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="videos" title="Videos">
            <Row>
              <Col>
                <ContentWrapper>
                  <Youtube videos={matchingDrink.youtubeVideos} />
                </ContentWrapper>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Drink;
