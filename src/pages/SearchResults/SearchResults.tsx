import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

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

  const isSearchSuccess = useRef(false);
  const isSearchFail = useRef(false);

  const searchPayload = useAppSelector((state) => state.user.searchPayload) as SearchPayload;
  const searchResults = useAppSelector((state) => state.user.searchResults) as IDrinkDoc[];

  // Set rendering conditions
  let searchPayloadsMatch = false;

  if (searchPayload) {
    searchPayloadsMatch =
      searchPayload.type.toLowerCase() === type.toLowerCase() &&
      searchPayload.query.toLowerCase() === query.toLowerCase();
  }

  const isNewSearch = !searchPayloadsMatch || (searchPayloadsMatch && !searchResults);

  if (isNewSearch) {
    isSearchSuccess.current = false;
    isSearchFail.current = false;
  } else {
    if (searchResults) {
      isSearchSuccess.current = true;
    } else {
      isSearchFail.current = true;
    }
  }

  useEffect(() => {
    if (isNewSearch) {
      dispatch(getSearchResults({ type, query }));
    }
  }, [type, query]);

  const renderContent = () => {
    const isSearchComplete = isSearchSuccess.current || isSearchFail.current;

    if (!isSearchComplete) {
      return (
        <ContentWrapper>
          <Row className="search-status">
            <Col>
              <strong>Retrieving data...</strong>
            </Col>
          </Row>
        </ContentWrapper>
      );
    } else {
      return (
        <ContentWrapper>
          <Row className="search-status">
            <Col>
              {isSearchSuccess.current && <p>{`Found ${searchResults.length} results for "${query}"`}</p>}
              {isSearchFail.current && <strong>Error retrieving data!</strong>}
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

  return (
    <div className="SearchResults">
      <Container>{renderContent()}</Container>
    </div>
  );
};

export default SearchResults;
