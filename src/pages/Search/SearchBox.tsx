import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

import { useAppDispatch } from '../../hooks';
import { useInput } from '../../hooks/useInput';
import { getSearchResults } from '../../store/userSlice';

import './SearchBox.css';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const { value: searchInput, bind: bindSearch, reset: resetSearch } = useInput('');

  const handleClick = (): void => {
    dispatch(getSearchResults(searchInput));
  };

  return (
    <InputGroup className="SearchBox">
      <FormControl {...bindSearch} />
      <Button variant="primary" onClick={handleClick}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBox;
