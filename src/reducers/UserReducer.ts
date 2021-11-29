import { IAction, IBottle } from '../types';

export interface IUserState {
  bottles: IBottle[];
  cellarView: string;
}

const initialState: IUserState = {
  bottles: [],
  cellarView: 'all'
};

export const UserReducer = (state: IUserState = initialState, action: IAction): IUserState => {
  switch (action.type) {
    case 'AddBottle':
      return {
        ...state,
        bottles: [...state.bottles, action.payload]
      };
    case 'SetCellarView':
      return {
        ...state,
        cellarView: action.payload
      };
    default:
      return state;
  }
};
