import React from 'react';
import { Row, Col } from 'react-bootstrap';

import 'styles/DrinkInstructions.css';

interface DrinkInstructionsProps {
  text: string;
}

const DrinkInstructions: React.FC<DrinkInstructionsProps> = ({ text }) => {
  return (
    <div className="DrinkInstructions">
      <Row>
        <Col>
          <p>{text}</p>
        </Col>
      </Row>
    </div>
  );
};

export default DrinkInstructions;
