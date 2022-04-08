import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import LoginForm from './LoginForm';
import ContentWrapper from '../../layout/ContentWrapper';

const Login: FC = () => (
  <div className="login-view">
    <ContentWrapper>
      <Row>
        <Col md={6}>
          <LoginForm />
        </Col>
      </Row>
    </ContentWrapper>
  </div>
);

export default Login;
