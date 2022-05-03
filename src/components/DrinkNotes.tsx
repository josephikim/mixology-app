import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { useAppSelector, useAppDispatch } from '../hooks';
import { saveNotes, NotesPayload } from '../store/userSlice';
import { createAlert } from '../store/alertSlice';

import '../styles/DrinkNotes.css';

interface DrinkNotesProps {
  drinkId: string;
}

const DrinkNotes: React.FC<DrinkNotesProps> = (props) => {
  const dispatch = useAppDispatch();
  const drink = useAppSelector((state) => state.user.drinks.filter((drink) => drink._id === props.drinkId))[0];

  const [notesInput, setNotesInput] = useState(drink.notes);

  const handleClick = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    const isValidInput = (notesInput && !drink.notes) || (drink.notes && notesInput !== drink.notes);

    if (isValidInput) {
      const payload = {
        idDrink: drink._id,
        notes: notesInput
      } as NotesPayload;

      const resultAction = await dispatch(saveNotes(payload));

      if (resultAction.type === 'user/saveNotes/fulfilled') {
        const payload = {
          id: uuid(),
          type: resultAction.type,
          message: 'Notes successfully saved'
        };

        dispatch(createAlert(payload));
      }
    } else {
      alert('No changes detected!');
    }
  };

  return (
    <Form className="DrinkNotes">
      <Form.Group controlId="formNotes">
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="enter text"
          value={notesInput}
          onChange={(e): void => setNotesInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" id={drink._id} onClick={(e): Promise<void> => handleClick(e)}>
        Submit
      </Button>
    </Form>
  );
};

export default DrinkNotes;
