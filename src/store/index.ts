import { createStore, compose } from 'redux';

import reducer from './reducers';

export default createStore(
  reducer,
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);
