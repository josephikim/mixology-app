import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

import { useInput } from 'hooks/useInput';

import 'styles/SearchBox.css';

const SearchBox: React.FC = () => {
  const navigate = useNavigate();
  const { value: searchInput, bind: bindSearch } = useInput('');

  const handleSearch = (): void => {
    const query = searchInput.trim();
    if (!query) return;

    const path = `/search/drink/${query}`;
    navigate(path);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup className="SearchBox">
      <FormControl
        {...bindSearch}
        placeholder='search for a drink e.g. "margarita"'
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBox;
