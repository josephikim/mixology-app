import React from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../Layout/ContentWrapper';
import CellarOptions from './CellarOptions';
import CellarDisplay from './CellarDisplay';

const CellarView: React.FC = () => {
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
};

export default CellarView;
