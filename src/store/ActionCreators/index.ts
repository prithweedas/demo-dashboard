import { UPDATE_LIST, ADD_PERSON } from '../ActionTypes';
import { IPerson } from '../../Types';

export const updateList = (list: any) => ({
  type: UPDATE_LIST,
  payload: list
});

export const addPerson = (person: IPerson) => ({
  type: ADD_PERSON,
  payload: person
});
