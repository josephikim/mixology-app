import React from 'react';
import { Row, Col } from 'antd';

import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

import ContentWrapper from '../../layout/ContentWrapper';

const Search: React.FC = () => {
  return (
    <ContentWrapper>
      <Row>
        <Col span={24}>
          <SearchBox />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SearchResults />
        </Col>
      </Row>
    </ContentWrapper>
  );
};

export default Search;
