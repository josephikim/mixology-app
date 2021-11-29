import { IAction } from '../types';

export interface IAppState {
  data: [];
  loading: boolean;
  isAuthenticated: boolean;
  error: string;
}

const initialState: IAppState = {
  data: [],
  loading: false,
  isAuthenticated: false,
  error: ''
};

export const AppReducer = (state: IAppState = initialState, action: IAction): IAppState => {
  switch (action.type) {
    case 'LoginStart':
      return {
        ...state,
        loading: true,
        error: '',
        isAuthenticated: false
      };
    case 'LoginSuccess':
      return {
        ...state,
        loading: false,
        error: '',
        isAuthenticated: true
      };
    case 'LoginFail':
      return {
        ...state,
        loading: false,
        error: 'Error occurred!',
        isAuthenticated: false
      };
    case 'LogoutUser':
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
