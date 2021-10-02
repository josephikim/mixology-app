import React, { Component } from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../components/Layout/ContentWrapper';
import CellarOptions from '../../components/CellarOptions';
import CellarDisplay from '../../components/CellarDisplay';

class CellarView extends Component<any, any> {
  render() {
    return (
      <ContentWrapper>
        <Row>
          <Col span={24}>
            <CellarOptions />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CellarDisplay />
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

export default CellarView;
