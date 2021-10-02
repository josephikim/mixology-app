import React from 'react';
import { Row, Col } from 'antd';

const style = { marginRight: '15%', marginLeft: '15%' };

const ContentWrapper = ({ children }: { children: any }) => (
  <Row gutter={16}>
    <Col span={24}>
      <div style={style}>{children}</div>
    </Col>
  </Row>
);

export default ContentWrapper;
