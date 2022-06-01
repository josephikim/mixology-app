import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';

import { IDrinkDoc } from '../db/Drink';
import DrinkTags from './DrinkTags';

import '../styles/DrinkInfo.css';

interface DrinkInfoProps {
  data: IDrinkDoc;
}

const DrinkInfo: React.FC<DrinkInfoProps> = ({ data }) => {
  if (!data || data == undefined) return null;

  const includesTags = data.strTags && data.strTags.length > 0;

  return (
    <div className="DrinkInfo">
      <Row>
        <Col md={4}>
          <h6>Category:</h6>
        </Col>
        <Col md={8}>{data.strCategory ? <Badge bg="primary">{data.strCategory}</Badge> : null}</Col>
      </Row>

      <Row>
        <Col md={4}>
          <h6>Alcohol Content:</h6>
        </Col>
        <Col md={8}>{data.strAlcoholic ? <Badge bg="warning">{data.strAlcoholic}</Badge> : null}</Col>
      </Row>
      {includesTags && (
        <Row>
          <Col md={4}>
            <h6>Tags:</h6>
          </Col>
          <Col md={8}>
            <DrinkTags tags={data.strTags as string} />
          </Col>
        </Row>
      )}
      <Row>
        <Col md={4}>
          <h6>Serving Glass:</h6>
        </Col>
        <Col md={8}>{data.strGlass}</Col>
      </Row>
    </div>
  );
};

export default DrinkInfo;
