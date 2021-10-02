import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import ContentWrapper from '../../components/Layout/ContentWrapper';

import BottleImage from '../../components/BottleImage';
import BottleInfo from '../../components/BottleInfo';
import BottleOptions from '../../components/BottleOptions';

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

class BottleView extends Component<any, any> {
  render() {
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
  }
}

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(BottleView);
