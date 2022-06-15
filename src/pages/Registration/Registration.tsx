import React, { FC } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import ContentWrapper from 'layout/ContentWrapper';
import RegistrationForm from './RegistrationForm';

const Registration: FC = () => (
  <div className="Registration">
    <Container>
      <Row>
        <Col md={6}>
          <ContentWrapper>
            <div id="about">
              <p>
                <strong>Mixology App</strong> is a convenient way to curate your favorite cocktails, research drink
                recipes, compose tasting notes, submit reviews and more.
              </p>
              <p>Please register to get started!</p>
            </div>
          </ContentWrapper>
        </Col>

        <Col md={6}>
          <ContentWrapper>
            <RegistrationForm />
          </ContentWrapper>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Registration;
