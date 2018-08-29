import initialState from '../../people';
import { UPDATE_LIST } from '../ActionTypes';

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_LIST:
      return payload;
    default:
      return state;
  }
};
