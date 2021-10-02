import { CREATE_BOTTLE, SET_CELLAR_VIEW } from '../actions';
import { Dispatcher } from '../Globals';

interface InitialState {
  bottles: [];
  cellarView: string;
}

const initialState: InitialState = {
  bottles: [],
  cellarView: 'all'
};

export default (state: InitialState = initialState, action: Dispatcher): InitialState => {
  switch (action.type) {
    case CREATE_BOTTLE:
      return {
        ...state,
        bottles: [...state.bottles, action.payload]
      };
    case SET_CELLAR_VIEW:
      return {
        ...state,
        cellarView: action.payload
      };
    default:
      return state;
  }
};
