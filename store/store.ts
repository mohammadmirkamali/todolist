/* eslint-disable import/no-extraneous-dependencies */

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function initializeStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
