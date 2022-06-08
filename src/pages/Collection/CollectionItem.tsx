import React from 'react';
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

import { IUserCollectionItemDoc } from '../../db/UserCollectionItem';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { RatingPayload, setRating } from '../../store/userSlice';
import DrinkInfo from '../../components/DrinkInfo';
import DrinkNotes from '../../components/DrinkNotes';
import DeleteCollectionItemButton from '../../components/DeleteCollectionItemButton';

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
                  <DrinkInfo />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="rating" title="Rating">
              <div className="tab-content-cont__rating">
                <p>Enter a rating from 1 to 5</p>
                <StarRatingComponent
                  name={collectionItem.idDrink}
                  starCount={5}
                  value={collectionItem.rating ? (collectionItem.rating as number) : 0}
                  onStarClick={(nextValue, prevValue, name) => onStarClick(nextValue, prevValue, name)}
                />
              </div>
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
