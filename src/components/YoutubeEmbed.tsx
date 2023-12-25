import React from 'react';
import 'styles/YoutubeEmbed.css';

interface YoutubeEmbedProps {
  embedId: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId }) => {
  return (
    <div className="YoutubeEmbed">
      <div className="youtube-player" data-embedid={embedId} />
    </div>
  );
};

export default YoutubeEmbed;
