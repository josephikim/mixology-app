// Express.js
declare module 'express-serve-static-core' {
  interface Request {
    id?: string;
  }
}

// API types
export type TokenResult = IApiResultBaseOf<IAuthToken>;

export interface IApiResultBase {
  statusCode: number;
  message: string;
}

export interface IApiResultBaseOf<T extends IAuthToken> extends IApiResultBase {
  data: T[];
}
export interface IAuthToken {
  userId: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IRegistration {
  username: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface SearchResult {
  drinkId: string;
  drinkName: string;
  drinkTags: [string];
  drinkGlass: string;
  drinkInstructions: string;
  drinkThumbSrc: string;
  drinkIngredient1: string;
  drinkIngredient2: string;
  drinkIngredient3: string;
  drinkIngredient4: string;
  drinkIngredient5: string;
  drinkIngredient6: string;
  drinkIngredient7: string;
  drinkIngredient8: string;
  drinkIngredient9: string;
  drinkIngredient10: string;
  drinkIngredient11: string;
  drinkIngredient12: string;
  drinkIngredient13: string;
  drinkIngredient14: string;
  drinkIngredient15: string;
  drinkMeasure1: string;
  drinkMeasure2: string;
  drinkMeasure3: string;
  drinkMeasure4: string;
  drinkMeasure5: string;
  drinkMeasure6: string;
  drinkMeasure7: string;
  drinkMeasure8: string;
  drinkMeasure9: string;
  drinkMeasure10: string;
  drinkMeasure11: string;
  drinkMeasure12: string;
  drinkMeasure13: string;
  drinkMeasure14: string;
  drinkMeasure15: string;
  drinkImgSrc: string;
}
