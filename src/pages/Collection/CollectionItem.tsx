import React from 'react';
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import Drink from '../../components/Drink';
import DrinkNotes from '../../components/DrinkNotes';
import DeleteCollectionItemButton from '../../components/DeleteCollectionItemButton';

import './CollectionItem.css';

type UrlParams = {
  id: string;
};

const CollectionItem: React.FC = () => {
  const { id } = useParams<UrlParams>();

  const collectionItem = useAppSelector((state) => state.user.collection)?.find((item) => item.idDrink === id);
  const matchingDrink = useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id);

  return (
    <div className="CollectionItem">
      {collectionItem && matchingDrink ? (
        <Container>
          <Tabs defaultActiveKey="info">
            <Tab eventKey="info" title="Info">
              <Row>
                <Col>
                  <Drink />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="notes" title="Notes">
              <ContentWrapper>
                <DrinkNotes notes={collectionItem.notes as string} idDrink={collectionItem.idDrink} />
              </ContentWrapper>
            </Tab>
            <Tab eventKey="rating" title="Rating">
              <Row>
                <Col>
                  <ContentWrapper>Rating</ContentWrapper>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="options" title="Options">
              <ContentWrapper>
                <DeleteCollectionItemButton
                  idDrink={matchingDrink.idDrink}
                  drinkName={matchingDrink.strDrink as string}
                />
              </ContentWrapper>
            </Tab>
          </Tabs>
        </Container>
      ) : (
        <Container>
          <div>Item not found...</div>
        </Container>
      )}
    </div>
  );
};

export default CollectionItem;
