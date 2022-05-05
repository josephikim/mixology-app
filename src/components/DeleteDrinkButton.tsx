import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { deleteDrink } from '../store/userSlice';
import { createAlert } from '../store/alertSlice';
import { useAppDispatch } from '../hooks';
import { IDrinkDoc } from '../db/Drink';

interface DeleteDrinkButtonProps {
  drinkId: string;
  drinkName: string;
}

const DeleteDrinkButton: React.FC<DeleteDrinkButtonProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleClick = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    if (window.confirm(`Are you sure you wish to delete "${props.drinkName}" from your collection?`)) {
      const resultAction = await dispatch(deleteDrink(props.drinkId));

      if (resultAction.type === 'user/deleteDrink/fulfilled') {
        const resultPayload = resultAction.payload as IDrinkDoc;

        const payload = {
          id: uuid(),
          type: resultAction.type,
          message: `${resultPayload.strDrink} successfully deleted`
        };

        dispatch(createAlert(payload));
      }
    }
  };

  return (
    <div className="DeleteDrinkButton">
      <Button variant="danger" id={props.drinkId} onClick={(e): Promise<void> => handleClick(e)}>
        Delete Drink
      </Button>
    </div>
  );
};

export default DeleteDrinkButton;
