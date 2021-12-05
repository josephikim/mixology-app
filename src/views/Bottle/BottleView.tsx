import React from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../Layout/ContentWrapper';

import BottleImage from './BottleImage';
import BottleInfo from './BottleInfo';
import BottleOptions from './BottleOptions';

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
        <Col span={6}>
          <BottleImage imgSrc="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/wine.png" />
        </Col>

        <Col span={12}>
          <BottleInfo {...bottle} />
        </Col>

        <Col span={6}>
          <BottleOptions />
        </Col>
      </Row>
    </ContentWrapper>
  );
};

export default BottleView;
