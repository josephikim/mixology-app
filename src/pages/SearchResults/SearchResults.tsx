import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import { SearchPayload, getSearchResults } from '../../store/userSlice';
import ContentWrapper from '../../layout/ContentWrapper';
import SearchResultItem from './SearchResultItem';
import { ISearchResult } from '../../types';

import './SearchResults.css';

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
    const isSearchLoading = searchStatus === 'idle' || searchStatus === 'loading';
    const isSearchSuccess = searchStatus === 'succeeded' && !isNewSearchType && !isNewSearchQuery;
    const isSearchFail = searchStatus === 'failed' && !isNewSearchType && !isNewSearchQuery;

    // search finished
    return (
      <ContentWrapper>
        <>
          <Row className="search-status">
            <Col>
              {isSearchLoading && <h5>Retrieving data...</h5>}
              {isSearchSuccess && <h5>{`Found ${searchResults.length} results for "${query}":`}</h5>}
              {isSearchFail && <h5>Error retrieving data!</h5>}
            </Col>
          </Row>
          {isSearchSuccess && (
            <Row>
              <Col>
                {searchResults.length > 0
                  ? searchResults.map((result) => {
                      return <SearchResultItem key={result.idDrink} data={result} />;
                    })
                  : null}
              </Col>
            </Row>
          )}
        </>
      </ContentWrapper>
    );
  };

  return <div className="SearchResults">{renderContent()}</div>;
};

export default SearchResults;
