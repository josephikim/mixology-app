import { Schema, Document, model } from 'mongoose';

import { YoutubeVideo } from '../types';

export interface IDrinkDoc extends Document {
  idDrink: string;
  strDrink?: string;
  strTags?: string;
  strIBA?: string;
  strAlcoholic?: string;
  strGlass?: string;
  strInstructions?: string;
  strInstructionsDE?: string;
  strInstructionsES?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
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
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strImageSource?: string;
  youtubeVideos?: YoutubeVideo[];
}

const drinkSchema = new Schema({
  idDrink: {
    type: String,
    required: true
  },
  strDrink: {
    type: String
  },
  strTags: {
    type: String
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
  strInstructionsDE: {
    type: String
  },
  strInstructionsES: {
    type: String
  },
  strInstructionsIT: {
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
  strIngredient10: {
    type: String
  },
  strIngredient11: {
    type: String
  },
  strIngredient12: {
    type: String
  },
  strIngredient13: {
    type: String
  },
  strIngredient14: {
    type: String
  },
  strIngredient15: {
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
  strMeasure10: {
    type: String
  },
  strMeasure11: {
    type: String
  },
  strMeasure12: {
    type: String
  },
  strMeasure13: {
    type: String
  },
  strMeasure14: {
    type: String
  },
  strMeasure15: {
    type: String
  },
  strImageSource: {
    type: String
  },
  youtubeVideos: {
    type: [Object]
  }
});

const Drink = model<IDrinkDoc>('Drink', drinkSchema);

export default Drink;
