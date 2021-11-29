import { createAddBottleAction, createSetCellarViewAction, IDispatch, IBottle } from '../types';
import { UserApi } from '../api';

export const addBottle: (bottle: IBottle) => (dispatch: IDispatch) => Promise<void> =
  (bottle: IBottle) =>
  async (dispatch: IDispatch): Promise<void> => {
    const api = new UserApi();
    try {
      const res = await api.addBottle(bottle);

      return Promise.resolve(res).then((res) => {
        const addedBottle = res.data[0];
        const addBottleAction = createAddBottleAction(addedBottle);
        dispatch(addBottleAction);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const setCellarView: (view: string) => (dispatch: IDispatch) => void =
  (view: string) =>
  (dispatch: IDispatch): void => {
    const setCellarViewAction = createSetCellarViewAction(view);
    dispatch(setCellarViewAction);
  };
