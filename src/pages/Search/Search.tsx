import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store';
import ContentWrapper from '../../layout/ContentWrapper';
import SearchBox from './SearchBox';
import SearchResultCard from './SearchResultCard';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const errorType = useAppSelector((state) => state.user.errorType);

  useEffect(() => {
    if (errorType === 'refreshToken' || errorType === 'accessToken' || errorType === 'role') {
      alert('Access error occurred. Please login again.');
      dispatch(logoutAction());
    }
  }, [errorType]);

  const searchResults = useAppSelector((state) => state.user.searchResults);
  const style = { marginBottom: '.7rem' };

  return (
    <div className="Search">
      <Container>
        <Row>
          <Col>
            <ContentWrapper>
              <Row>
                <strong style={style}>Search for a drink or cocktail (e.g. "margarita")</strong>
              </Row>
              <SearchBox />
            </ContentWrapper>
          </Col>
        </Row>

        <ContentWrapper>
          <Row className="row-cols-3">
            {searchResults.length > 0
              ? searchResults.map((result) => {
                  return <SearchResultCard key={result.idDrink} data={result} />;
                })
              : null}
          </Row>
        </ContentWrapper>
      </Container>
    </div>
  );
};

export default Search;
