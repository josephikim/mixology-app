import React, { useState } from 'react';
import { Button, Input } from 'antd';

import { useAppSelector, useAppDispatch } from '../hooks';
import { saveNotes, NotesPayload } from '../store/userSlice';

import '../styles/DrinkNotes.css';

interface DrinkNotesProps {
  drinkId: string;
}

const { TextArea } = Input;

const DrinkNotes: React.FC<DrinkNotesProps> = (props) => {
  const dispatch = useAppDispatch();
  const drink = useAppSelector((state) => state.user.drinks.filter((drink) => drink._id === props.drinkId))[0];

  const [notesInput, setNotesInput] = useState(drink.notes);

  const handleSubmitNotes = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();

    const payload = {
      idDrink: drink._id,
      notes: notesInput
    } as NotesPayload;

    if ((!drink.notes && notesInput !== '') || notesInput !== drink.notes) {
      dispatch(saveNotes(payload));
      return;
    }

    alert('No changes deteted!');
  };

  return (
    <Input.Group className="DrinkNotes">
      <TextArea rows={6} placeholder="enter text" value={notesInput} onChange={(e) => setNotesInput(e.target.value)} />
      <Button type="primary" id={drink._id} onClick={(e) => handleSubmitNotes(e)}>
        Submit
      </Button>
    </Input.Group>
  );
};

export default DrinkNotes;
