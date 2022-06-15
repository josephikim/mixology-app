import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { useAppDispatch } from 'hooks';
import YoutubeEmbed from './YoutubeEmbed';
import YoutubeMeta from './YoutubeMeta';
import { YoutubeVideo } from 'types';
import { getDrinkWithVideos } from 'store/baseSlice';
interface YoutubeProps {
  idDrink: string;
  videos?: YoutubeVideo[];
}

const Youtube: React.FC<YoutubeProps> = ({ idDrink, videos }) => {
  const dispatch = useAppDispatch();
  const isDrinkMissingVideos = idDrink && (!videos || !videos.length);
  const style = { marginTop: '1.5rem', marginBottom: '1.5rem' };

  if (isDrinkMissingVideos) {
    dispatch(getDrinkWithVideos(idDrink));
  }

  return (
    <div className="Youtube">
      {videos && videos.length > 0 ? (
        videos.map((video) => {
          return (
            <Row style={style} key={video.id}>
              <Col md={6}>
                <YoutubeEmbed embedId={video.id as string} />
              </Col>
              <Col md={6}>
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
