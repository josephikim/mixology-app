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
      <Table borderless size="sm">
        <tbody>
          <tr>
            <td className="table-header">Title:</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td className="table-header">Channel:</td>
            <td>{channelTitle}</td>
          </tr>
          <tr>
            <td className="table-header">Description:</td>
            <td>{description}</td>
          </tr>
          <tr>
            <td className="table-header">Published:</td>
            <td>{publishedAt}</td>
          </tr>
          <tr>
            <td className="table-header">Link:</td>
            <td>
              <a
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
              >{`https://www.youtube.com/watch?v=${id}`}</a>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default YoutubeMeta;
