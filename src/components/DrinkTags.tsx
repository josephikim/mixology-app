import React from 'react';
import { Tag } from 'antd';

import '../styles/DrinkRecipe.css';

interface DrinkTagsProps {
  tags: string[] | undefined;
}

const DrinkTags: React.FC<DrinkTagsProps> = (props) => {
  if (!props.tags) return null;

  return (
    <div className="DrinkTags">
      {props.tags.map((tag) => {
        return <Tag>{tag}</Tag>;
      })}
    </div>
  );
};

export default DrinkTags;
