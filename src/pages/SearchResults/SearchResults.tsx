import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import { getSearchResults } from '../../store/userSlice';
import ContentWrapper from '../../layout/ContentWrapper';
import SearchResultCard from './SearchResultCard';

type UrlParams = {
  type: string;
  query: string;
};

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const errorType = useAppSelector((state) => state.user.errorType);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      alert('Access error occurred. Please login again.');
      dispatch(logoutAction());
    }
  }, [errorType]);

  const location = useLocation();
  const { type, query } = useParams<UrlParams>();

  useEffect(() => {
    dispatch(getSearchResults({ type, query } as UrlParams));
  }, [location.pathname]);

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
