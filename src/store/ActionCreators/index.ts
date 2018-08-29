import { UPDATE_LIST } from '../ActionTypes';

export const updateList = (list: any) => ({
  type: UPDATE_LIST,
  payload: list
});
