import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
} from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import rootReducer from '../reducers';
function configureStore(initialState) {
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
    routerMiddleware(browserHistory),
    promiseMiddleware,
    thunk,
  ];
  return middleware;
}

export default configureStore;
