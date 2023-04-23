import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useAppSelector } from 'hooks';
import { IKeywordDoc } from 'db/Keyword';

import 'styles/KeywordLinks.css';

interface KeywordLinksProps {
  type: string;
}

const KeywordLinks: React.FC<KeywordLinksProps> = ({ type }) => {
  const keywords = useAppSelector((state) => state.base.keywords) as IKeywordDoc[];

  const isArray = keywords.constructor === Array;

  if (!isArray || (isArray && keywords.length < 1)) return null;

  // filter keywords by type and sort alphabetically
  const keywordsByType = keywords
    .filter((keyword) => keyword.type === type)
    .sort((a, b) => a.value.localeCompare(b.value)) as IKeywordDoc[];

  const displayHeading = (type: string) => {
    let result = type;

    if (type === 'ingredient') result = 'Ingredients';
    if (type === 'category') result = 'Categories';
    if (type === 'alcohol') result = 'Alcohol Content';
    if (type === 'glass') result = 'Serving Glass';

    return result;
  };

  return (
    <div className="KeywordLinks">
      <Row>
        <Col>
          <h5>{displayHeading(type)}</h5>
        </Col>
      </Row>

      <Row>
        {keywordsByType.map((keyword) => {
          return (
            <Col key={keyword.value} md={6}>
              <Link to={`/search/${encodeURIComponent(keyword.type)}/${encodeURIComponent(keyword.value)}`}>
                {keyword.value}
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default KeywordLinks;
