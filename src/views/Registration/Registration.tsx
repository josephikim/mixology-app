import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';

import img from '../../assets/cellar-img.jpg';

const Registration: FC = () => (
  <div className="registration-view">
    <Container>
      <Row>
        <Col md={6}>
          <div id="about">
            <p>
              <strong>Drink Cellar</strong> is an easy-to-use online app for curating your personal collection of wines
              and spirits. Cheers!
            </p>
            <p>Please register to get started:</p>
            <img id="cellar-img" src={img}></img>
          </div>
        </Col>

        <Col md={6}>
          <RegistrationForm />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Registration;
