import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useAppSelector } from '../hooks';
import { IKeywordDoc } from '../db/Keyword';

import '../styles/KeywordLinks.css';

interface KeywordLinksProps {
  type: string;
}

const KeywordLinks: React.FC<KeywordLinksProps> = ({ type }) => {
  const keywords = useAppSelector((state) => state.base.keywords);

  if (!keywords.length) return null;

  // filter keywords by type and sort alphabetically
  const keywordsByType = keywords
    .filter((keyword) => keyword.type === type)
    .sort((a, b) => a.value.localeCompare(b.value)) as IKeywordDoc[];

  return (
    <div className="KeywordLinks">
      <Row>
        <Col>
          <h6>Search by {type}</h6>
        </Col>
      </Row>

      <Row>
        {keywordsByType.map((keyword) => {
          return (
            <Col key={keyword.value} md={6}>
              <Link to={`/search/${keyword.type}/${keyword.value}`}>{keyword.value}</Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default KeywordLinks;
