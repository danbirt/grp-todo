import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import MultiListView from '../ui/MultiListView';
import ListView from '../ui/ListView';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

window.browserHistory = browserHistory;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/multilistview', '/listview'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/multilistview');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = '/' + browserHistory.getCurrentLocation().pathname.split('/')[1];
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    console.log("on auth change");
    console.log(pathname);
  
    if (isAuthenticated && isUnauthenticatedPage) {
      browserHistory.replace('/multilistview');
    } else if (!isAuthenticated && isAuthenticatedPage) {
      browserHistory.replace('/');
    }  
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/multilistview" component={MultiListView} onEnter={onEnterPrivatePage}/>
    <Route path="/listview/:listid" component={ListView} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} />
  </Router>
);