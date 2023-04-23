import React, { FC } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import ContentWrapper from 'layout/ContentWrapper';
import LoginForm from './LoginForm';

const Login: FC = () => (
  <div className="Login">
    <Container>
      <Row>
        <Col md={4}>
          <ContentWrapper>
            <LoginForm />
          </ContentWrapper>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Login;
