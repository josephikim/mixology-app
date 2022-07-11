import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from 'hooks';
import { saveNotes, NotesPayload } from 'store/userSlice';
import { createAlert } from 'store/alertSlice';

import 'styles/DrinkNotes.css';

interface DrinkNotesProps {
  notes: string;
  idDrink: string;
}

const DrinkNotes: React.FC<DrinkNotesProps> = ({ notes, idDrink }) => {
  const dispatch = useAppDispatch();

  const [notesInput, setNotesInput] = useState(notes);

  useEffect(() => {
    if (!notes) {
      setNotesInput('');
    } else {
      if (notesInput != notes) {
        setNotesInput(notes);
      }
    }
  }, [notes]);

  const handleClick = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    const isValidInput = (notesInput && !notes) || (notes && notesInput !== notes);

    if (isValidInput) {
      const payload = {
        idDrink: idDrink,
        notes: notesInput
      } as NotesPayload;

      const resultAction = await dispatch(saveNotes(payload));

      if (resultAction.type === 'user/saveNotes/fulfilled') {
        const alertPayload = {
          id: uuid(),
          type: resultAction.type,
          message: 'Notes successfully saved'
        };

        dispatch(createAlert(alertPayload));
      }
    } else {
      alert('No changes detected!');
    }
  };

  return (
    <div className="DrinkNotes">
      <Container>
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
          <Button variant="primary" id={idDrink} onClick={(e): Promise<void> => handleClick(e)}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default DrinkNotes;
