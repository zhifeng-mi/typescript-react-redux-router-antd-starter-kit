import { combineReducers } from 'redux';
const { routerReducer } = require('react-router-redux');
import user from "./user";
const rootReducer = combineReducers({
    routing: routerReducer,
    user
});

export default rootReducer;