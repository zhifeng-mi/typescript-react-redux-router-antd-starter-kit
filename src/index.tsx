import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Router,Route,Switch,Redirect} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {configureStore,history} from './store/configureStore';
import {getCookie} from './utils';

import {connect} from 'react-redux';

import App from './views/App/app';
import Login from "./views/Login/login";
import Home from "./views/Home/home";

//Initial
const store = configureStore({});
const userCookie = getCookie();

console.log(userCookie);

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
        <Route exact path="/" render={() => (
          userCookie.type ? (<Redirect to="/home"/>):(<Redirect to="/login"/>)
        )}/>          
          <Route path='/login' component={Login} />          
          <Route path='/' component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);