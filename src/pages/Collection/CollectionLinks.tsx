import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { IDrinkDoc } from '../../db/Drink';
import { useAppSelector } from '../../hooks';

import './CollectionLinks.css';

interface CollectionLinksProps {
  drinks: IDrinkDoc[];
}

const CollectionLinks: React.FC<CollectionLinksProps> = ({ drinks }) => {
  if (!drinks.length) return null;

  // sort drinks alphabetically
  const drinksSorted = drinks.sort((a, b) => (a.strDrink as string).localeCompare(b.strDrink as string));

  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <div className="CollectionLinks">
      <Row>
        <Col>
          <strong>My Collection</strong>
        </Col>
      </Row>

      <Row>
        {drinksSorted.map((drink) => {
          return (
            <Col key={drink.idDrink} xs={12}>
              <Link to={`/collection/${userId}/${drink.idDrink}`}>{drink.strDrink}</Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CollectionLinks;
