import React from 'react';
import { Button } from 'react-bootstrap';

import { deleteDrink } from '../store/userSlice';
import { useAppDispatch } from '../hooks';

interface DeleteDrinkButtonProps {
  drinkId: string;
  drinkName: string;
}

const DeleteDrinkButton: React.FC<DeleteDrinkButtonProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    window.confirm(`Are you sure you wish to delete "${props.drinkName}" from your collection?`) &&
      dispatch(deleteDrink(props.drinkId));
  };

  return (
    <div className="DeleteDrinkButton">
      <Button variant="danger" id={props.drinkId} onClick={(e): void => handleClick(e)}>
        Delete Drink
      </Button>
    </div>
  );
};

export default DeleteDrinkButton;
