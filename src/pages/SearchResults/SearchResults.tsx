import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import { getSearchResults, SearchPayload } from '../../store/userSlice';
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

  const errorType = useAppSelector((state) => state.user.errorType);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      alert('Access error occurred. Please login again.');
      dispatch(logoutAction());
    }
  }, [errorType]);

  const { type, query } = useParams<UrlParams>();

  const status = useAppSelector((state) => state.user.status);
  const searchPayload = useAppSelector((state) => state.user.searchPayload) as SearchPayload;
  const drinks = useAppSelector((state) => state.user.drinks);

  let isSearchPayloadMatch = false;

  if (
    searchPayload != undefined &&
    searchPayload.type.toLowerCase() === (type as string).toLowerCase() &&
    searchPayload.query.toLowerCase() === (query as string).toLowerCase()
  ) {
    isSearchPayloadMatch = true;
  }

  const isSearchComplete = isSearchPayloadMatch && drinks != undefined && status !== 'loading';

  useEffect(() => {
    if (!isSearchComplete) {
      dispatch(getSearchResults({ type, query } as UrlParams));
    }
  }, []);

  if (isSearchComplete && status === 'succeeded' && !isSearchSuccess) setIsSearchSuccess(true);
  if (isSearchComplete && status === 'failed' && !isSearchFail) setIsSearchFail(true);

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
              {isSearchSuccess && <h5>{`Found ${drinks.length} results for "${query}":`}</h5>}
              {isSearchFail && <h5>Error retrieving data!</h5>}
            </Col>
          </Row>
          {isSearchSuccess && (
            <Row>
              <Col>
                {drinks.length > 0
                  ? drinks.map((drink) => {
                      return <SearchResultItem key={drink.idDrink} drink={drink} />;
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
