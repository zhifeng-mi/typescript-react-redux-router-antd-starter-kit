import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
} from 'redux';
import createHistory from 'history/createBrowserHistory'

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import rootReducer from '../reducers';


export const history = createHistory()

export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(..._getMiddleware()),
        )
    );
    return store;
}

function _getMiddleware(): Middleware[] {
  let middleware = [
    routerMiddleware(history),
    promiseMiddleware,
    thunk,
  ];
  return middleware;
}

