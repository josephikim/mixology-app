import React from 'react';
import { Row, Table, List, Divider } from 'antd';

import { IDrink } from '../db/drink';

import '../styles/DrinkRecipe.css';
interface DrinkRecipeProps {
  data: IDrink;
}

const { Column, ColumnGroup } = Table;

const buildRecipe = (drink) => {
  const data: any[] = [];
  for (const prop in drink) {
    if (Object.prototype.hasOwnProperty.call(drink, prop)) {
      if (prop.startsWith('strIngredient')) {
        // parse numeric key from property name e.g '2' from 'strIngredient2'
        const matches = prop.match(/\d+$/);
        if (!matches) continue;

        const key = matches[0];
        const strMeasureProp = `strMeasure${key}`;
        const str = `${drink[strMeasureProp]} ${drink[prop]}`;

        data.push({
          key: key,
          entry: str
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
      <Divider orientation="left">Ingredients</Divider>
      <Row>
        <List dataSource={recipeData} rowKey="key" renderItem={(item) => <List.Item>{item.entry}</List.Item>} />
      </Row>

      <Divider orientation="left">Instructions</Divider>
      <Row>
        <div id="instructions">
          <p>{props.data.strInstructions}</p>
        </div>
      </Row>
    </div>
  );
};

export default DrinkRecipe;
