import React, { FC } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import ContentWrapper from 'layout/ContentWrapper';
import RegistrationForm from './RegistrationForm';
import Slideshow from 'components/Slideshow';

import './Registration.css';

const Registration: FC = () => (
  <div className="Registration">
    <Container>
      <Row>
        <Col md={8}>
          <ContentWrapper>
            <Row className="registration-about">
              <Col>
                <p>
                  <strong>Mixology App</strong> helps you curate your favorite drinks, search recipes, submit ratings,
                  compose tasting notes and more.
                </p>
                <p>Please register to get started!</p>
              </Col>
            </Row>
            <Row className="registration-slideshow">
              <Col>
                <Slideshow />
              </Col>
            </Row>
          </ContentWrapper>
        </Col>

        <Col md={4}>
          <ContentWrapper>
            <RegistrationForm />
          </ContentWrapper>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Registration;
