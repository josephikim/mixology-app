import { Schema, Document, model } from 'mongoose';

import { IUserDoc } from './User';

export interface IDrinkDoc extends Document {
  user: IUserDoc;
  idDrinkApi: string;
  rating?: number;
  notes?: string;
  strDrink?: string;
  strTags?: string[];
  strIBA?: string;
  strAlcoholic?: string;
  strGlass?: string;
  strInstructions?: string;
  strDrinkThumb?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strImageSource?: string;
}

const drinkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    idDrinkApi: {
      type: String,
      required: true
    },
    rating: {
      type: Number
    },
    notes: {
      type: String
    },
    strDrink: {
      type: String
    },
    strTags: {
      type: [String]
    },
    strIBA: {
      type: String
    },
    strAlcoholic: {
      type: String
    },
    strGlass: {
      type: String
    },
    strInstructions: {
      type: String
    },
    strDrinkThumb: {
      type: String
    },
    strIngredient1: {
      type: String
    },
    strIngredient2: {
      type: String
    },
    strIngredient3: {
      type: String
    },
    strIngredient4: {
      type: String
    },
    strIngredient5: {
      type: String
    },
    strIngredient6: {
      type: String
    },
    strIngredient7: {
      type: String
    },
    strIngredient8: {
      type: String
    },
    strIngredient9: {
      type: String
    },
    strMeasure1: {
      type: String
    },
    strMeasure2: {
      type: String
    },
    strMeasure3: {
      type: String
    },
    strMeasure4: {
      type: String
    },
    strMeasure5: {
      type: String
    },
    strMeasure6: {
      type: String
    },
    strMeasure7: {
      type: String
    },
    strMeasure8: {
      type: String
    },
    strMeasure9: {
      type: String
    },
    strImageSource: {
      type: String
    }
  },
  { emitIndexErrors: true }
);

const Drink = model<IDrinkDoc>('Drink', drinkSchema);

export default Drink;
