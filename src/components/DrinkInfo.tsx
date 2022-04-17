import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { IDrinkDoc } from '../db/Drink';
import DrinkTags from './DrinkTags';

import '../styles/DrinkInfo.css';

interface DrinkInfoProps {
  data: IDrinkDoc;
}

const DrinkInfo: React.FC<DrinkInfoProps> = (props) => {
  return (
    <div className="DrinkInfo">
      <Row>
        <Col md={4}>
          <strong>Name:</strong>
        </Col>
        <Col md={8}>{props.data.strDrink}</Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Category:</strong>
        </Col>
        <Col md={8}>{props.data.strAlcoholic}</Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Glass:</strong>
        </Col>
        <Col md={8}>{props.data.strGlass}</Col>
      </Row>

      <Row>
        <Col md={4}>
          <strong>Tags:</strong>
        </Col>
        <Col md={8}>
          <DrinkTags tags={props.data.strTags as string[]} />
        </Col>
      </Row>
    </div>
  );
};

export default DrinkInfo;
