import { CREATE_BOTTLE, SET_CELLAR_VIEW } from '.';
import { Dispatch } from '../Globals';
import { UserApi } from '../api';
import { Bottle } from '../models';

export const createBottle = (bottle: Bottle) => async (dispatch: Dispatch) => {
  const api = new UserApi();
  try {
    const res = await api.createBottle(bottle);

    return Promise.resolve(res).then((res) => {
      dispatch({
        type: CREATE_BOTTLE,
        payload: res
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const setCellarView = (view: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CELLAR_VIEW,
    payload: view
  });
};
