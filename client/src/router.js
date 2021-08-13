import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './app.js';
import SignUp from './signUp.js';
import SignIn from './signIn.js';
import AddBook from './addBook.js';
import ShowBook from './showBook.js';

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/SignIn" component={SignIn}/>
            <Route exact path="/AddBook" component={AddBook}/>
            <Route exact path="/ShowBook/:id" component={ShowBook}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;