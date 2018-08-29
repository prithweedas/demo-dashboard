import initialState from '../../people';
import { UPDATE_LIST, ADD_PERSON } from '../ActionTypes';

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_LIST:
      return payload;

    case ADD_PERSON:
      return [...state, payload];
    default:
      return state;
  }
};
