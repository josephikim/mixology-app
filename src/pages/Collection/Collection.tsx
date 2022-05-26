import React from 'react';
import { Accordion, Container, Tabs, Tab, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IUserCollectionItemDoc } from '../../db/UserCollectionItem';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
import DrinkIngredients from '../../components/DrinkIngredients';
import DrinkInstructions from '../../components/DrinkInstructions';
import DrinkNotes from '../../components/DrinkNotes';
import DeleteDrinkButton from '../../components/DeleteDrinkButton';
import Youtube from '../../components/Youtube';

import './Collection.css';

const Collection: React.FC = () => {
  const collection = useAppSelector((state) => state.user.collection) as IUserCollectionItemDoc[];

  const renderCollectionItem = (collectionItem: IUserCollectionItemDoc) => {
    const matchingDrink = useAppSelector((state) => state.base.drinks).filter(
      (drink) => drink.idDrink === collectionItem.idDrink
    )[0];

    if (!matchingDrink || !matchingDrink.idDrink) return null;

    return (
      <Accordion.Item eventKey={matchingDrink.idDrink} key={matchingDrink.idDrink}>
        <Accordion.Header>{matchingDrink.strDrink}</Accordion.Header>
        <Accordion.Body>
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
            <Tab eventKey="notes" title="Notes">
              <Row>
                <Col md={8}>
                  <ContentWrapper>
                    <DrinkNotes notes={collectionItem.notes as string} idDrink={collectionItem.idDrink} />
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
            <Tab eventKey="options" title="Options">
              <Row>
                <Col md={6}>
                  <ContentWrapper>
                    <DeleteDrinkButton idDrink={matchingDrink.idDrink} drinkName={matchingDrink.strDrink as string} />
                  </ContentWrapper>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <div className="Collection">
      <Container>
        {collection && collection.length > 0 ? (
          <Accordion defaultActiveKey={collection[0].idDrink} alwaysOpen>
            {collection.map((item) => renderCollectionItem(item))}
          </Accordion>
        ) : (
          <strong>No collection items found</strong>
        )}
      </Container>
    </div>
  );
};

export default Collection;
