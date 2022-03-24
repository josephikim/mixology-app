import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';

// import img from '../../assets/cellar-img.jpg';

const Registration: FC = () => (
  <div className="registration-view">
    <Container>
      <Row>
        <Col md={6}>
          <div id="about">
            <p>
              <strong>Mixology App</strong> is a convenient way to curate your favorite cocktails, research recipes and
              ingredients, and submit reviews and tasting notes. Cheers!
            </p>
            <p>Please register to get started:</p>
            {/* <img id="mixology-img" width="500" src={img}></img> */}
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
