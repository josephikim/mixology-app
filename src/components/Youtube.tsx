import React from 'react';
import { Row, Col } from 'react-bootstrap';

import YoutubeEmbed from './YoutubeEmbed';
import YoutubeMeta from './YoutubeMeta';
import { YoutubeVideo } from '../types';

interface YoutubeProps {
  videos?: YoutubeVideo[];
}

const Youtube: React.FC<YoutubeProps> = (props) => {
  const style = { marginTop: '1.5rem', marginBottom: '1.5rem' };
  return (
    <div className="Youtube">
      {props.videos && props.videos.length > 0 ? (
        props.videos.map((video, index) => {
          return (
            <Row style={style} key={video.id}>
              <Col md={4}>
                <YoutubeEmbed embedId={video.id as string} />
              </Col>
              <Col md={8}>
                <YoutubeMeta
                  id={video.id}
                  title={video.title}
                  channelTitle={video.channelTitle}
                  description={video.description}
                  publishedAt={video.publishedAt}
                />
              </Col>
            </Row>
          );
        })
      ) : (
        <span>Loading videos...</span>
      )}
    </div>
  );
};

export default Youtube;
