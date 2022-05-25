import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { IDrinkDoc } from '../db/Drink';
import { IUserCollectionItemDoc } from '../db/UserCollectionItem';
import { addCollectionItem } from '../store/userSlice';
import { createAlert } from '../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

interface AddCollectionItemButtonProps {
  idDrink: string;
}

const AddCollectionItemButton: React.FC<AddCollectionItemButtonProps> = ({ idDrink }) => {
  if (!idDrink) return null;

  const dispatch = useAppDispatch();

  const authToken = useAppSelector((state) => state.auth.accessToken);
  const collection = useAppSelector((state) => state.user.collection);

  // Find matching drink
  let matchingDrink = {} as IDrinkDoc;

  matchingDrink = useAppSelector((state) => state.base.drinks).filter((drink) => drink.idDrink === idDrink)[0];

  if (!matchingDrink.idDrink) return null;

  // Find collection item with matching drink
  let collectionItem = {} as IUserCollectionItemDoc;

  if (collection && collection.length > 0) {
    collectionItem = collection.filter((item) => item.idDrink === matchingDrink.idDrink)[0];
  }

  const handleClick = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    if (authToken) {
      const resultAction = await dispatch(addCollectionItem(matchingDrink.idDrink));

      if (resultAction.type === 'user/addCollectionItem/fulfilled') {
        const payload = {
          id: uuid(),
          type: resultAction.type,
          message: `${matchingDrink.strDrink} successfully added to collection`
        };
        dispatch(createAlert(payload));
      }
    } else {
      alert('Please login to manage your collection.');
    }
  };

  return (
    <div className="AddCollectionItemButton">
      {collectionItem && collectionItem.idDrink ? (
        <Button variant="success" id={collectionItem.idDrink}>
          Added to collection <i className="las la-check"></i>
        </Button>
      ) : (
        <Button id={idDrink} onClick={(e: React.MouseEvent<HTMLElement>): Promise<void> => handleClick(e)}>
          Add to collection
        </Button>
      )}
    </div>
  );
};

export default AddCollectionItemButton;
