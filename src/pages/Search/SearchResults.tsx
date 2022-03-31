import React from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../Layout/ContentWrapper';

const MyDrinks: React.FC = () => {
  return (
    <ContentWrapper>
      <Row>
        <Col span={24}>{/* <DrinkCard /> */}</Col>
      </Row>
    </ContentWrapper>
  );
};

export default MyDrinks;
