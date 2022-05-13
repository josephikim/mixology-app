import React from 'react';
import { Badge } from 'react-bootstrap';

interface DrinkTagsProps {
  tags: string;
}

const DrinkTags: React.FC<DrinkTagsProps> = ({ tags }) => {
  if (!tags || tags.length < 1) return null;

  const tagsArr = tags.split(/[, ]+/).filter((element) => element);
  const style = { marginRight: '.7rem', marginBottom: '.7rem' };

  return (
    <div className="DrinkTags">
      {tagsArr.map((tag, index) => {
        return (
          <Badge key={index} style={style}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
};

export default DrinkTags;
