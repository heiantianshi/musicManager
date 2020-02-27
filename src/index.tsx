import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, message, notification } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Provider } from "mobx-react";
import store from './store';
import { HashRouter, Route, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import Login from './page/Login/index';
import * as serviceWorker from './serviceWorker';


const Component = (
    <Provider {...store}>
        <ConfigProvider locale={zhCN}>
            <HashRouter>
                <Switch>
                    <Route exact  path="/login" component={Login} />
                    <Route  path="/" component={App} />
                </Switch>
            </HashRouter>
        </ConfigProvider>
    </Provider>
);

ReactDOM.render(Component, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
