import React from 'react';
import { Table } from 'antd';

import { IDrink } from '../db/drink';
import ContentWrapper from '../layout/ContentWrapper';

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
        const obj = {};
        const matches = prop.match(/\d+$/);
        if (!matches) continue;

        const key = matches[0];
        obj['key'] = key;
        obj['ingredient'] = drink[prop];
        obj['measure'] = drink[`strMeasure${key}`];

        data.push(obj);
      }
    }
  }
  return data;
};

const DrinkRecipe: React.FC<DrinkRecipeProps> = (props) => {
  const recipeData = buildRecipe(props.data);

  return (
    <ContentWrapper>
      <Table dataSource={recipeData}>
        <Column title="Ingredient" dataIndex="ingredient" key="ingredient" />
        <Column title="Measure" dataIndex="measure" key="measure" />
      </Table>
    </ContentWrapper>
  );
};

export default DrinkRecipe;
