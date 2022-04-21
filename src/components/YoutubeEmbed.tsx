import React, { useEffect } from 'react';

import { initYouTubeVideos } from '../utils/YoutubeHelper';

import '../styles/YoutubeEmbed.css';
interface YoutubeEmbedProps {
  embedId: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId }) => {
  useEffect(() => {
    initYouTubeVideos();
  }, []);

  return (
    <div className="YoutubeEmbed">
      <div className="youtube-player" data-id={embedId} />
    </div>
  );
};

export default YoutubeEmbed;
