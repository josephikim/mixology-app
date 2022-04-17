import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import ContentWrapper from '../../layout/ContentWrapper';
import SearchBox from './SearchBox';
import SearchResultCard from './SearchResultCard';

const Search: React.FC = () => {
  const searchResults = useAppSelector((state) => state.user.searchResults);
  const style = { marginBottom: '.7rem' };

  return (
    <div className="Search">
      <Container>
        <Row>
          <Col>
            <ContentWrapper>
              <Row>
                <span style={style}>Search for a drink or cocktail (e.g. "margarita")</span>
              </Row>
              <SearchBox />
            </ContentWrapper>
          </Col>
        </Row>

        <ContentWrapper>
          <Row className="row-cols-3">
            {searchResults
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
