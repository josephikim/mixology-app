import React from 'react';
import { Row, Col } from 'antd';

import ContentWrapper from '../../components/Layout/ContentWrapper';
import CellarOptions from '../../components/CellarOptions';
import CellarDisplay from '../../components/CellarDisplay';

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
