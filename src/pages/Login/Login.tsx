import React, { FC } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import LoginForm from './LoginForm';

const Login: FC = () => (
  <div className="login-view">
    <Container>
      <Row>
        <Col md={6}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Login;
