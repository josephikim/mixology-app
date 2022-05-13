import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import { SearchPayload, getSearchResults } from '../../store/userSlice';
import ContentWrapper from '../../layout/ContentWrapper';
import SearchResultCard from './SearchResultCard';
import { ISearchResult } from '../../types';

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

  const { type, query } = useParams<UrlParams>();

  const searchStatus = useAppSelector((state) => state.user.searchStatus);
  const searchPayload = useAppSelector((state) => state.user.searchPayload) as SearchPayload;
  const searchResults = useAppSelector((state) => state.user.searchResults) as ISearchResult[];
  let isNewSearchType = false;
  let isNewSearchQuery = false;

  if (searchPayload !== undefined && Object.keys(searchPayload).length > 0) {
    isNewSearchType = searchPayload.type.toLowerCase() !== (type as string).toLowerCase();
  }
  if (searchPayload !== undefined && Object.keys(searchPayload).length > 0) {
    isNewSearchQuery = searchPayload.query.toLowerCase() !== (query as string).toLowerCase();
  }

  const handleSearch = async () => {
    if (searchStatus !== 'loading' && (!searchPayload || isNewSearchType || isNewSearchQuery)) {
      dispatch(getSearchResults({ type, query } as UrlParams));
    } else {
      return;
    }
  };

  handleSearch().catch((err) => {
    alert(err);
  });

  const renderContent = () => {
    const isSearchSuccess = searchStatus === 'succeeded' && !isNewSearchType && !isNewSearchQuery;
    const isSearchFail = searchStatus === 'failed' && !isNewSearchType && !isNewSearchQuery;

    if (searchStatus === 'idle' || searchStatus === 'loading') {
      return (
        <ContentWrapper>
          <h5>Retrieving data...</h5>
        </ContentWrapper>
      );
    }

    // search finished
    return (
      <ContentWrapper>
        {isSearchSuccess && (
          <>
            <Row>
              <h5>{`Found ${searchResults.length} results for "${query}":`}</h5>
            </Row>
            <Row className="row-cols-3">
              {searchResults.length > 0
                ? searchResults.map((result) => {
                    return <SearchResultCard key={result.idDrink} data={result} />;
                  })
                : null}
            </Row>
          </>
        )}
        {isSearchFail && <h5>Error retrieving data!</h5>}
      </ContentWrapper>
    );
  };

  return <div className="SearchResults">{renderContent()}</div>;
};

export default SearchResults;
