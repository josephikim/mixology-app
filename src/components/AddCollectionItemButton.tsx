import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { addCollectionItem } from '../store/userSlice';
import { createAlert } from '../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

interface AddCollectionItemButtonProps {
  idDrink: string;
}

const AddCollectionItemButton: React.FC<AddCollectionItemButtonProps> = ({ idDrink }) => {
  if (!idDrink || idDrink == undefined) return null;

  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.auth.userId);
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const collection = useAppSelector((state) => state.user.collection);

  const isDrinkInCollection = collection?.some((item) => item.idDrink === idDrink);

  const handleClick = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    if (authToken) {
      const payload = {
        user: userId,
        idDrink: idDrink
      };

      const resultAction = await dispatch(addCollectionItem(payload));

      if (resultAction.type === 'user/addCollectionItem/fulfilled') {
        const alertPayload = {
          id: uuid(),
          type: resultAction.type,
          message: `Drink successfully added to collection`
        };
        dispatch(createAlert(alertPayload));
      }
    } else {
      alert('Please login to manage your collection.');
    }
  };

  return (
    <div className="AddCollectionItemButton">
      {isDrinkInCollection ? (
        <Button variant="success" id={idDrink}>
          Added to collection <i className="las la-check"></i>
        </Button>
      ) : (
        <Button id={idDrink} onClick={(e): Promise<void> => handleClick(e)}>
          Add to collection
        </Button>
      )}
    </div>
  );
};

export default AddCollectionItemButton;
