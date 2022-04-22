import React from 'react';
import { Table } from 'react-bootstrap';

import '../styles/YoutubeMeta.css';

interface YoutubeMetaProps {
  id?: string;
  title?: string;
  channelTitle?: string;
  description?: string;
  publishedAt?: string;
}

const YoutubeMeta: React.FC<YoutubeMetaProps> = ({ id, title, channelTitle, description, publishedAt }) => {
  return (
    <div className="YoutubeMeta">
      <Table borderless>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td>Channel:</td>
            <td>{channelTitle}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{description}</td>
          </tr>
          <tr>
            <td>Published:</td>
            <td>{publishedAt}</td>
          </tr>
          <tr>
            <td>Link:</td>
            <td>{`http://wwww.youtube.com/?=${id}`}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default YoutubeMeta;
