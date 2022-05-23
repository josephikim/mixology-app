import React from 'react';
import { Row, ListGroup } from 'react-bootstrap';

import { IDrinkDoc } from '../db/Drink';

import '../styles/DrinkIngredients.css';

interface DrinkIngredientsProps {
  data: IDrinkDoc;
}

interface IngredientsEntry {
  key: string;
  entry: string;
}

const buildIngredients = (drink: IDrinkDoc): IngredientsEntry[] => {
  const drinkClone = JSON.parse(JSON.stringify(drink));
  const data: IngredientsEntry[] = [];

  for (const prop in drinkClone) {
    if (Object.prototype.hasOwnProperty.call(drinkClone, prop)) {
      if (prop.startsWith('strIngredient')) {
        // parse numeric key from property name e.g '2' from 'strIngredient2'
        const matchesArr = prop.match(/\d+$/);

        // no property with numeric suffix found
        if (!matchesArr || matchesArr.length < 1) continue;

        const key = matchesArr[0];
        const measureProp = `strMeasure${key}`;

        // property value is null
        if (!drinkClone[measureProp] || !drinkClone[prop]) continue;

        const result = `\u2022 ${drinkClone[measureProp] ? drinkClone[measureProp] : ''} ${drinkClone[prop]}`;

        data.push({
          key: key,
          entry: result
        });
      }
    }
  }
  return data;
};

const DrinkIngredientProps: React.FC<DrinkIngredientsProps> = ({ data }) => {
  const ingredients = buildIngredients(data);

  return (
    <div className="DrinkIngredients">
      <Row>
        <ListGroup>
          {ingredients.map((entry) => {
            return <ListGroup.Item key={entry.key}>{entry.entry}</ListGroup.Item>;
          })}
        </ListGroup>
      </Row>
    </div>
  );
};

export default DrinkIngredientProps;
