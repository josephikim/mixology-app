import React from 'react';
import { Container, Tabs, Tab, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

import { IUserCollectionItemDoc } from 'db/UserCollectionItem';
import { useAppSelector, useAppDispatch } from 'hooks';
import { RatingPayload, setRating } from 'store/userSlice';
import ContentWrapper from 'layout/ContentWrapper';
import DrinkInfo from 'components/DrinkInfo';
import DrinkNotes from 'components/DrinkNotes';
import DeleteCollectionItemButton from 'components/DeleteCollectionItemButton';

import './CollectionItem.css';

type UrlParams = {
  id: string;
};

const CollectionItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<UrlParams>();

  const collectionItem = useAppSelector((state) => state.user.collection)?.find(
    (item) => item.idDrink === id
  ) as IUserCollectionItemDoc;

  const matchingDrink = useAppSelector((state) => state.base.drinks).find((drink) => drink.idDrink === id);

  const onStarClick = async (nextValue: number, prevValue: number, name: string) => {
    if (prevValue === nextValue) return;

    const payload = {
      idDrink: name,
      rating: nextValue
    } as RatingPayload;

    await dispatch(setRating(payload));
  };

  return (
    <div className="CollectionItem">
      {collectionItem && matchingDrink ? (
        <Container>
          <Tabs defaultActiveKey="info">
            <Tab eventKey="info" title="Info">
              <Row>
                <Col>
                  <div className="tab-content-cont__info">
                    <Row>
                      <Col md={5}>
                        <ContentWrapper>
                          <Image width={250} height={250} src={matchingDrink.strDrinkThumb} fluid />
                        </ContentWrapper>
                      </Col>
                      <Col md={7}>
                        <Row>
                          <ContentWrapper>
                            <h4>{matchingDrink.strDrink}</h4>
                            <StarRatingComponent
                              name={collectionItem.idDrink}
                              starCount={5}
                              value={collectionItem.rating ? (collectionItem.rating as number) : 0}
                              onStarClick={(nextValue, prevValue, name) => onStarClick(nextValue, prevValue, name)}
                            />
                            <p>My Rating</p>
                          </ContentWrapper>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <DrinkInfo />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="notes" title="Notes">
              <DrinkNotes notes={collectionItem.notes as string} idDrink={collectionItem.idDrink} />
            </Tab>
            <Tab eventKey="options" title="Options">
              <DeleteCollectionItemButton
                idDrink={matchingDrink.idDrink}
                drinkName={matchingDrink.strDrink as string}
              />
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
