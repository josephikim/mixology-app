import React from 'react';
import { Badge } from 'react-bootstrap';

import '../styles/DrinkRecipe.css';

interface DrinkTagsProps {
  tags: string[];
}

const DrinkTags: React.FC<DrinkTagsProps> = (props) => {
  const style = { marginRight: '.7rem', marginBottom: '.7rem' };

  return (
    <div className="DrinkTags">
      {props.tags.length > 0 ? (
        props.tags.map((tag, index) => {
          return (
            <Badge key={index} style={style}>
              {tag}
            </Badge>
          );
        })
      ) : (
        <span>none</span>
      )}
    </div>
  );
};

export default DrinkTags;
