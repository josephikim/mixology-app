import React from 'react';
import { Badge } from 'react-bootstrap';

interface DrinkCategoryTagsProps {
  category: string;
}

const DrinkCategoryTags: React.FC<DrinkCategoryTagsProps> = ({ category }) => {
  if (!category || category == undefined) return null;

  return <div className="DrinkCategoryTags">{category ? <Badge bg="primary">{category}</Badge> : null}</div>;
};

export default DrinkCategoryTags;
