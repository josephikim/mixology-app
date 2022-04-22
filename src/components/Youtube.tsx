import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ContentWrapper from '../layout/ContentWrapper';
import YoutubeEmbed from './YoutubeEmbed';
import YoutubeMeta from './YoutubeMeta';
import { YoutubeVideo } from '../types';

import '../styles/DrinkRecipe.css';
interface YoutubeProps {
  videos?: YoutubeVideo[];
}

const Youtube: React.FC<YoutubeProps> = (props) => {
  return (
    <div className="Youtube">
      {props.videos && props.videos.length > 0 ? (
        props.videos.map((video, index) => {
          return (
            <Row>
              <Col md={6}>
                <ContentWrapper>
                  <YoutubeEmbed embedId={video.id as string} />
                </ContentWrapper>
              </Col>
              <Col md={6}>
                <ContentWrapper>
                  <YoutubeMeta
                    title={video.title}
                    channelTitle={video.channelTitle}
                    description={video.description}
                    publishedAt={video.publishedAt}
                  />
                </ContentWrapper>
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
