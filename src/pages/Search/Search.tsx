import React from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../layout/ContentWrapper';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

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
