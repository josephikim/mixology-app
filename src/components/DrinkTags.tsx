import React from 'react';
import { Badge } from 'react-bootstrap';

import 'styles/DrinkTags.css';
interface DrinkTagsProps {
  tags: string;
}

const DrinkTags: React.FC<DrinkTagsProps> = ({ tags }) => {
  if (!tags || tags == undefined) return null;

  const tagsArr = tags.split(/[, ]+/).filter((element) => element);

  return (
    <div className="DrinkTags">
      {tagsArr.map((tag, index) => {
        return (
          <Badge bg="secondary" key={index}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
};

export default DrinkTags;
