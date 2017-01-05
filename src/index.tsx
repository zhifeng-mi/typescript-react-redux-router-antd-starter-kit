import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import {getCookie} from './utils';


import App from './views/App/app';
import Login from "./views/Login/login";
import Home from "./views/Home/home";


//Initial
const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
const validate = (next:Router.RouterState, replace:Router.RedirectFunction, callback:Function) => {
    const userCookie = getCookie();
    if(userCookie.type!=="admin"&&next.location.pathname!="/login"){
        replace('/login');
    }
    callback();
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" onEnter={validate}>
                <IndexRedirect to="home" />
                <Route component={App}>
                    <Route path="home" component={Home}/>            
                </Route>
                <Route path="login" component={Login}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);