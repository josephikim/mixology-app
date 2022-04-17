import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

import { useAppDispatch } from '../../hooks';
import { useInput } from '../../hooks/useInput';
import { getSearchResults } from '../../store/userSlice';

import './SearchBox.css';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const { value: searchInput, bind: bindSearch } = useInput('');

  const handleSearch = (): void => {
    dispatch(getSearchResults(searchInput));
  };

  return (
    <InputGroup className="SearchBox">
      <FormControl {...bindSearch} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBox;
