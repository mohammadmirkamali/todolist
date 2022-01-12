/* eslint-disable import/no-extraneous-dependencies */
import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStore = (initialState = {}) =>
  createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore);
