import React from 'react';
import { Row, ListGroup } from 'react-bootstrap';

import { IDrinkDoc } from '../db/Drink';

import '../styles/DrinkRecipe.css';
interface DrinkRecipeProps {
  data: IDrinkDoc;
}

interface RecipeEntry {
  key: string;
  entry: string;
}

const buildRecipe = (drink: IDrinkDoc): RecipeEntry[] => {
  const drinkClone = JSON.parse(JSON.stringify(drink));
  const data: RecipeEntry[] = [];

  for (const prop in drinkClone) {
    if (Object.prototype.hasOwnProperty.call(drinkClone, prop)) {
      if (prop.startsWith('strIngredient')) {
        // parse numeric key from property name e.g '2' from 'strIngredient2'
        const matches = prop.match(/\d+$/);
        if (!matches) continue;

        const key = matches[0];
        const measureProp = `strMeasure${key}`;
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

const DrinkRecipe: React.FC<DrinkRecipeProps> = (props) => {
  const recipeData = buildRecipe(props.data);

  return (
    <div className="DrinkRecipe">
      <h6>Ingredients</h6>
      <Row>
        <ListGroup>
          {recipeData.map((entry) => {
            return <ListGroup.Item key={entry.key}>{entry.entry}</ListGroup.Item>;
          })}
        </ListGroup>
      </Row>

      <h6>Instructions</h6>
      <Row>
        <div id="instructions">
          <p>{props.data.strInstructions}</p>
        </div>
      </Row>
    </div>
  );
};

export default DrinkRecipe;
