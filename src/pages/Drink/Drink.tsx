import React from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../layout/ContentWrapper';

const Drink: React.FC = () => {
  return (
    <ContentWrapper>
      <Row>
        <Col span={6}>{/* <DrinkImage /> */}</Col>

        <Col span={12}>{/* <DrinkInfo /> */}</Col>
      </Row>
    </ContentWrapper>
  );
};

export default Drink;
