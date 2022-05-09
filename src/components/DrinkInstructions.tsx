import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../styles/DrinkInstructions.css';

interface DrinkInstructionsProps {
  instructions: string;
}

const DrinkInstructions: React.FC<DrinkInstructionsProps> = ({ instructions }) => {
  return (
    <div className="DrinkInstructions">
      <Row>
        <Col>
          <p>{instructions}</p>
        </Col>
      </Row>
    </div>
  );
};

export default DrinkInstructions;
