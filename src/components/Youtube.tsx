import React from 'react';

import YoutubeEmbed from './YoutubeEmbed';

import '../styles/DrinkRecipe.css';

interface YoutubeEmbedProps {
  ids?: string[];
}

const Youtube: React.FC<YoutubeEmbedProps> = (props) => {
  return (
    <div className="Youtube">
      {props.ids && props.ids.length > 0 ? (
        props.ids.map((id, index) => {
          return <YoutubeEmbed key={index} embedId={id} />;
        })
      ) : (
        <span>Loading videos...</span>
      )}
    </div>
  );
};

export default Youtube;
