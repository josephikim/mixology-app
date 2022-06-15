import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { IDrinkDoc } from 'db/Drink';
import { useAppSelector } from 'hooks';

import './CollectionLinks.css';

interface CollectionLinksProps {
  drinks: IDrinkDoc[];
}

const CollectionLinks: React.FC<CollectionLinksProps> = ({ drinks }) => {
  if (!drinks.length) return null;

  // sort drinks alphabetically
  const drinksSorted = drinks.sort((a, b) => (a.strDrink as string).localeCompare(b.strDrink as string));

  const userId = useAppSelector((state) => state.auth.userId);

  const activeClassName = 'active';

  return (
    <div className="CollectionLinks">
      <Row>
        <Col>
          <h5>My Collection</h5>
        </Col>
      </Row>

      <Row>
        {drinksSorted.map((drink) => {
          return (
            <Col key={drink.idDrink} xs={12}>
              <NavLink
                to={`/collection/${userId}/${drink.idDrink}`}
                className={({ isActive }) => (isActive ? activeClassName : undefined)}
              >
                {drink.strDrink}
              </NavLink>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CollectionLinks;
