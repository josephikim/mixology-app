import React, { useEffect } from 'react';
import { Accordion, Container, Tabs, Tab, Row, Col, Image } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import { IDrinkDoc } from '../../db/Drink';
import { IUserCollectionItemDoc } from '../../db/UserCollectionItem';
import ContentWrapper from '../../layout/ContentWrapper';
import DrinkInfo from '../../components/DrinkInfo';
import DrinkIngredients from '../../components/DrinkIngredients';
import DrinkInstructions from '../../components/DrinkInstructions';
import DrinkNotes from '../../components/DrinkNotes';
import DeleteDrinkButton from '../../components/DeleteDrinkButton';
import Youtube from '../../components/Youtube';

const Collection: React.FC = () => {
  const dispatch = useAppDispatch();

  const errorType = useAppSelector((state) => state.user.errorType);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      alert('Access error occurred. Please login again.');
      dispatch(logoutAction());
    }
  }, [errorType]);

  const collection = useAppSelector((state) => state.user.collection) as IUserCollectionItemDoc[];
  const drinks = useAppSelector((state) => state.user.drinks) as IDrinkDoc[];

  const renderCollectionItem = (idDrink: string) => {
    const collectionItem = collection.filter((item) => (item.idDrink = idDrink))[0];
    const collectionItemDrink = drinks.filter((drink) => (drink.idDrink = idDrink))[0];
    if (collectionItemDrink == undefined || Object.keys(collectionItemDrink).length < 1) return null;

    return (
      <Accordion.Item eventKey={collectionItemDrink.idDrink} key={collectionItemDrink.idDrink}>
        <Accordion.Header>{collectionItemDrink.strDrink}</Accordion.Header>
        <Accordion.Body>
          <Tabs defaultActiveKey="info">
            <Tab eventKey="info" title="Info">
              <Row>
                <Col md={6}>
                  <ContentWrapper>
                    <DrinkInfo data={collectionItemDrink} />
                  </ContentWrapper>
                </Col>
                <Col md={6}>
                  <ContentWrapper>
                    <Image width={250} height={250} src={collectionItemDrink.strDrinkThumb} fluid />
                  </ContentWrapper>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="recipe" title="Recipe">
              <Row>
                <Col md={6}>
                  <ContentWrapper>
                    <DrinkIngredients data={collectionItemDrink} />
                    <DrinkInstructions text={collectionItemDrink.strInstructions as string} />
                  </ContentWrapper>
                </Col>
                <Col md={6}>
                  <ContentWrapper>
                    <Image width={250} height={250} src={collectionItemDrink.strDrinkThumb} fluid />
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
                    <Youtube videos={collectionItemDrink.youtubeVideos} />
                  </ContentWrapper>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="options" title="Options">
              <Row>
                <Col md={6}>
                  <ContentWrapper>
                    <DeleteDrinkButton
                      idDrink={collectionItemDrink.idDrink}
                      drinkName={collectionItemDrink.strDrink as string}
                    />
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
        <ContentWrapper>
          {collection.length > 0 ? (
            <Accordion defaultActiveKey={collection[0].idDrink} alwaysOpen>
              {collection.map((item, index) =>
                item == undefined || index == undefined ? null : renderCollectionItem(item.idDrink)
              )}
            </Accordion>
          ) : (
            <span>
              Add drinks to your collection from the <a href="/search">Search</a> page.
            </span>
          )}
        </ContentWrapper>
      </Container>
    </div>
  );
};

export default Collection;
