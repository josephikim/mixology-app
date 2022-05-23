import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { IUserCollectionItemDoc } from '../../db/UserCollectionItem';
import { getDrinks } from '../../store/userSlice';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
import DrinkIngredients from '../../components/DrinkIngredients';
import DrinkInstructions from '../../components/DrinkInstructions';
import DrinkNotes from '../../components/DrinkNotes';
import Youtube from '../../components/Youtube';

import './Drink.css';

type UrlParams = {
  id: string;
};

const Drink: React.FC = () => {
  const { id } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const userStatus = useAppSelector((state) => state.user.status);
  const drink = useAppSelector((state) => state.user.drinks).filter((drink) => drink.idDrink === id)[0];
  const drinkLoaded = drink && drink.idDrink === id;

  const collection = useAppSelector((state) => state.user.collection) as IUserCollectionItemDoc[];

  useEffect(() => {
    if (!drinkLoaded && userStatus !== 'loading') {
      dispatch(getDrinks());
    }
  }, []);

  let collectionItemMatchesDrink = false;

  if (collection) {
    collectionItemMatchesDrink = collection.some((item) => item.idDrink === drink.idDrink);
  }

  let collectionItem = {} as IUserCollectionItemDoc;

  if (collectionItemMatchesDrink) {
    collectionItem = collection.filter((item) => item.idDrink === drink.idDrink)[0];
  }
  return (
    <div className="Drink">
      {drinkLoaded ? (
        <Tabs defaultActiveKey="info">
          <Tab eventKey="info" title="Info">
            <Row>
              <Col md={6}>
                <ContentWrapper>
                  <DrinkInfo data={drink} />
                </ContentWrapper>
              </Col>
              <Col md={6}>
                <ContentWrapper>
                  <Image width={250} height={250} src={drink.strDrinkThumb} fluid />
                </ContentWrapper>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="recipe" title="Recipe">
            <Row>
              <Col md={4}>
                <ContentWrapper>
                  <h6>Ingredients:</h6>
                  <DrinkIngredients data={drink} />
                </ContentWrapper>
              </Col>
              <Col md={8}>
                <ContentWrapper>
                  <h6>Instructions:</h6>
                  <DrinkInstructions text={drink.strInstructions as string} />
                </ContentWrapper>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="videos" title="Videos">
            <Row>
              <Col>
                <ContentWrapper>
                  <Youtube videos={drink.youtubeVideos} />
                </ContentWrapper>
              </Col>
            </Row>
          </Tab>
          {authToken && collectionItemMatchesDrink && (
            <Tab eventKey="notes" title="Notes">
              <Row>
                <Col md={8}>
                  <ContentWrapper>
                    <DrinkNotes notes={collectionItem.notes as string} idDrink={collectionItem.idDrink} />
                  </ContentWrapper>
                </Col>
              </Row>
            </Tab>
          )}
        </Tabs>
      ) : (
        <Row>
          <Col>
            <ContentWrapper>
              <h6>loading drink...</h6>
            </ContentWrapper>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Drink;
