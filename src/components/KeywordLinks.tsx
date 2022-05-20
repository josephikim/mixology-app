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
  const keywords = useAppSelector((state) => state.user.keywords);

  if (!keywords.length) return null;

  // filter keywords by type and sort alphabetically
  const keywordsByType = keywords
    .filter((keyword) => keyword.type === type)
    .sort((a, b) => a.value.localeCompare(b.value)) as IKeywordDoc[];

  return (
    <div className="KeywordLinks">
      <Row>
        <Col>
          <label>Search by {type}</label>
        </Col>
      </Row>

      <Row>
        <Col>
          {keywordsByType.map((keyword) => {
            return (
              <Link key={keyword.value} to={`/search/${keyword.type}/${keyword.value}`}>
                {keyword.value}
              </Link>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default KeywordLinks;
