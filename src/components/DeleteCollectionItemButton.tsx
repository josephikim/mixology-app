import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { deleteCollectionItem } from 'store/userSlice';
import { createAlert } from 'store/alertSlice';
import { useAppDispatch } from 'hooks';
import { IUserCollectionItemDoc } from 'db/UserCollectionItem';

interface DeleteCollectionItemButtonProps {
  idDrink: string;
  drinkName: string;
}

const DeleteCollectionItemButton: React.FC<DeleteCollectionItemButtonProps> = ({ idDrink, drinkName }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    if (window.confirm(`Are you sure you wish to delete "${drinkName}" from your collection?`)) {
      const resultAction = await dispatch(deleteCollectionItem(idDrink));

      if (resultAction.type === 'user/deleteCollectionItem/fulfilled') {
        const resultPayload = resultAction.payload as IUserCollectionItemDoc;

        const payload = {
          id: uuid(),
          type: resultAction.type,
          message: `Collection item #${resultPayload.idDrink} successfully deleted`
        };

        await dispatch(createAlert(payload));

        const path = `/collection`;
        navigate(path);
      }
    }
  };

  return (
    <div className="DeleteCollectionItemButton">
      <Button variant="danger" id={idDrink} onClick={(e): Promise<void> => handleClick(e)}>
        Delete Drink
      </Button>
    </div>
  );
};

export default DeleteCollectionItemButton;
