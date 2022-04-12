import React from 'react';
import { Row, List } from 'antd';

import { IDrinkDoc } from '../db/Drink';

import '../styles/DrinkRecipe.css';
interface DrinkRecipeProps {
  data: IDrinkDoc;
}

interface RecipeData {
  key: string;
  entry: string;
}

const buildRecipe = (drink: IDrinkDoc) => {
  const data: RecipeData[] = [];
  for (const prop in drink) {
    if (Object.prototype.hasOwnProperty.call(drink, prop)) {
      if (prop.startsWith('strIngredient')) {
        // parse numeric key from property name e.g '2' from 'strIngredient2'
        const matches = prop.match(/\d+$/);
        if (!matches) continue;

        const key = matches[0];
        const measureProp = `strMeasure${key}`;
        const result = `${drink[measureProp]} ${drink[prop]}`;

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
        <List dataSource={recipeData} rowKey="key" renderItem={(item) => <List.Item>{item.entry}</List.Item>} />
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
