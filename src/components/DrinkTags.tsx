import React from 'react';
import { Tag } from 'antd';

import '../styles/DrinkRecipe.css';

interface DrinkTagsProps {
  tags: string[];
}

const DrinkTags: React.FC<DrinkTagsProps> = (props) => {
  return (
    <div className="DrinkTags">
      {props.tags.length > 0 ? (
        props.tags.map((tag) => {
          return <Tag>{tag}</Tag>;
        })
      ) : (
        <span>none</span>
      )}
    </div>
  );
};

export default DrinkTags;
