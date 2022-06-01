import React from 'react';
import { Badge } from 'react-bootstrap';

interface DrinkAlcoholTagsProps {
  alcohol: string;
}

const DrinkAlcoholTags: React.FC<DrinkAlcoholTagsProps> = ({ alcohol }) => {
  if (!alcohol || alcohol == undefined) return null;

  return <div className="DrinkAlcoholTags">{alcohol ? <Badge bg="warning">{alcohol}</Badge> : null}</div>;
};

export default DrinkAlcoholTags;
