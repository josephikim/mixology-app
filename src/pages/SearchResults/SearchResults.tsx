import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSearchResults, SearchPayload } from '../../store/userSlice';
import { IDrinkDoc } from '../../db/Drink';
import ContentWrapper from '../../layout/ContentWrapper';
import SearchResultItem from './SearchResultItem';

import './SearchResults.css';

type UrlParams = {
  type: string;
  query: string;
};

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();

  const { type, query } = useParams() as UrlParams;

  const [isSearchSuccess, setIsSearchSuccess] = useState(false);
  const [isSearchFail, setIsSearchFail] = useState(false);

  const status = useAppSelector((state) => state.user.status);
  const searchPayload = useAppSelector((state) => state.user.searchPayload) as SearchPayload;
  const searchResults = useAppSelector((state) => state.user.searchResults) as IDrinkDoc[];

  // Set rendering conditions
  let searchPayloadsMatch = false;

  if (searchPayload) {
    searchPayloadsMatch =
      searchPayload.type.toLowerCase() === type.toLowerCase() &&
      searchPayload.query.toLowerCase() === query.toLowerCase();
  }

  if (searchPayloadsMatch) {
    if (status === 'succeeded' && !isSearchSuccess) setIsSearchSuccess(true);
    if (status === 'failed' && !isSearchFail) setIsSearchFail(true);
  } else {
    if (isSearchSuccess) setIsSearchSuccess(false);
    if (isSearchFail) setIsSearchFail(false);
  }

  useEffect(() => {
    // Check conditions to dispatch search action
    let isNewSearch = false;

    if (!searchPayload) {
      isNewSearch = true;
    } else if ('type' in searchPayload && 'query' in searchPayload) {
      isNewSearch =
        searchPayload.type.toLowerCase() !== type.toLowerCase() ||
        searchPayload.query.toLowerCase() !== query.toLowerCase();
    }

    if (isNewSearch) {
      dispatch(getSearchResults({ type, query } as UrlParams));
    }
  }, [type, query]);

  const renderContent = () => {
    const isSearchComplete = isSearchSuccess || isSearchFail;

    if (!isSearchComplete) {
      return (
        <ContentWrapper>
          <Row className="search-status">
            <Col>
              <h5>Retrieving data...</h5>
            </Col>
          </Row>
        </ContentWrapper>
      );
    } else {
      return (
        <ContentWrapper>
          <Row className="search-status">
            <Col>
              {isSearchSuccess && <h5>{`Found ${searchResults.length} results for "${query}"`}</h5>}
              {isSearchFail && <h5>Error retrieving data!</h5>}
            </Col>
          </Row>
          {isSearchSuccess && (
            <Row>
              <Col>
                {searchResults.length > 0
                  ? searchResults.map((result) => {
                      return <SearchResultItem key={result.idDrink} drink={result} />;
                    })
                  : null}
              </Col>
            </Row>
          )}
        </ContentWrapper>
      );
    }
  };

  return <div className="SearchResults">{renderContent()}</div>;
};

export default SearchResults;
