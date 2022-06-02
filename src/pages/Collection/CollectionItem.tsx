import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import Drink from '../../components/Drink';
import DrinkNotes from '../../components/DrinkNotes';
import DeleteCollectionItemButton from '../../components/DeleteCollectionItemButton';

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
          <div className="col-item-cell col-item-cell--1">
            <div className="col-item-item">
              <Drink />
            </div>
          </div>
          <div className="col-item-cell col-item-cell--2">
            <div className="col-item-item">
              <ContentWrapper>
                <DrinkNotes notes={collectionItem.notes as string} idDrink={collectionItem.idDrink} />
              </ContentWrapper>
            </div>
          </div>
          <div className="col-item-cell col-item-cell--3">
            <div className="col-item-item">
              <ContentWrapper>
                <DeleteCollectionItemButton
                  idDrink={matchingDrink.idDrink}
                  drinkName={matchingDrink.strDrink as string}
                />
              </ContentWrapper>
            </div>
          </div>
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
