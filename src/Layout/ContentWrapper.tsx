import React from 'react';
import { Row, Col } from 'antd';

const style = { marginRight: '15%', marginLeft: '15%', marginTop: '30px', marginBottom: '30px' };

type ContentWrapperProps = {
  children?: React.ReactNode;
};

const ContentWrapper: React.FC = ({ children }: ContentWrapperProps) => (
  <Row gutter={16}>
    <Col span={24}>
      <div style={style}>{children}</div>
    </Col>
  </Row>
);

export default ContentWrapper;
