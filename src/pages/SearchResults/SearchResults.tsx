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

  const [isSearchSuccess, setIsSearchSuccess] = useState(false);
  const [isSearchFail, setIsSearchFail] = useState(false);

  const { type, query } = useParams<UrlParams>();

  const status = useAppSelector((state) => state.user.status);
  const searchPayload = useAppSelector((state) => state.user.searchPayload) as SearchPayload;
  const searchResults = useAppSelector((state) => state.user.searchResults) as IDrinkDoc[];

  let isNewSearch = false;

  if (
    !searchPayload ||
    searchPayload.type.toLowerCase() !== (type as string).toLowerCase() ||
    searchPayload.query.toLowerCase() !== (query as string).toLowerCase()
  ) {
    isNewSearch = true;
  }

  useEffect(() => {
    if (isNewSearch) {
      dispatch(getSearchResults({ type, query } as UrlParams));
    }
  }, []);

  // Set search end status
  if (!isNewSearch && status === 'succeeded' && !isSearchSuccess) setIsSearchSuccess(true);
  if (!isNewSearch && status === 'failed' && !isSearchFail) setIsSearchFail(true);

  const renderContent = () => {
    const isSearchPending = !isSearchSuccess && !isSearchFail;

    if (isSearchPending) {
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
