import React from 'react';
import { Row, Col } from 'react-bootstrap';

const style = { marginRight: '10%', marginLeft: '10%', marginTop: '2rem', marginBottom: '2rem' };

interface ContentWrapperProps {
  children?: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => (
  <Row className="ContentWrapper">
    <Col>
      <div style={style}>{children}</div>
    </Col>
  </Row>
);

export default ContentWrapper;
