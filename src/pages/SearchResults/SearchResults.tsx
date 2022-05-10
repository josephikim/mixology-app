import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import ContentWrapper from '../../layout/ContentWrapper';
import SearchResultCard from './SearchResultCard';

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const errorType = useAppSelector((state) => state.user.errorType);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      alert('Access error occurred. Please login again.');
      dispatch(logoutAction());
    }
  }, [errorType]);

  const searchResults = useAppSelector((state) => state.user.searchResults);

  return (
    <div className="SearchResults">
      <ContentWrapper>
        <Row className="row-cols-3">
          {searchResults.length > 0
            ? searchResults.map((result) => {
                return <SearchResultCard key={result.idDrink} data={result} />;
              })
            : null}
        </Row>
      </ContentWrapper>
    </div>
  );
};

export default SearchResults;
