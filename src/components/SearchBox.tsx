import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

import { useAppDispatch } from '../hooks';
import { useInput } from '../hooks/useInput';
import { getSearchResults } from '../store/userSlice';

import '../styles/SearchBox.css';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const { value: searchInput, bind: bindSearch } = useInput('');

  // handles button click or 'Enter' key press
  const handleSearch = (): boolean => {
    const query = searchInput.trim();
    if (!query) return false;

    dispatch(getSearchResults(query));
    return true;
  };

  return (
    <InputGroup className="SearchBox">
      <FormControl
        {...bindSearch}
        placeholder='search for a drink e.g. "margarita"'
        onKeyPress={(e): boolean => e.key === 'Enter' && handleSearch()}
      />
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBox;
