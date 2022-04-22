import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../hooks';
import { saveNotes, NotesPayload } from '../store/userSlice';

import '../styles/DrinkNotes.css';

interface DrinkNotesProps {
  drinkId: string;
}

const DrinkNotes: React.FC<DrinkNotesProps> = (props) => {
  const dispatch = useAppDispatch();
  const drink = useAppSelector((state) => state.user.drinks.filter((drink) => drink._id === props.drinkId))[0];

  const [notesInput, setNotesInput] = useState(drink.notes);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    if ((!drink.notes && notesInput !== '') || notesInput !== drink.notes) {
      const payload = {
        idDrink: drink._id,
        notes: notesInput
      } as NotesPayload;

      debugger;
      dispatch(saveNotes(payload)).then(() => {
        alert('Notes successfully updated!');
      });
      return;
    }

    alert('No changes deteted!');
  };

  return (
    <Form className="DrinkNotes">
      <Form.Group controlId="formNotes">
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="enter text"
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" id={drink._id} onClick={(e) => handleClick(e)}>
        Submit
      </Button>
    </Form>
  );
};

export default DrinkNotes;
