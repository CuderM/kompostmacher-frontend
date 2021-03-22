import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import App from '../App';
import Admin from './Admin';
import WorkingPage from './WorkingPage';
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/workingPage" component={WorkingPage} />
                    <Route path="/admin" component={Admin} />
                </Switch>
            </Router>
        )
    }
}