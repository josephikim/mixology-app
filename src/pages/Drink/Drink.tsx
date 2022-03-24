import React from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../Layout/ContentWrapper';

const bottle = {
  id: 101,
  category: 'wine',
  name: 'Scarlet Red',
  producer: 'Moms Wineries',
  country: 'US',
  price: 2099,
  style: 'cabernet',
  abv: '13',
  rating: 91,
  vintage: 1999
};

const BottleView: React.FC = () => {
  return (
    <ContentWrapper>
      <Row>
        <Col span={6}>{/* <DrinkImage /> */}</Col>

        <Col span={12}>{/* <DrinkInfo /> */}</Col>
      </Row>
    </ContentWrapper>
  );
};

export default BottleView;
