import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './Auth/PrivateRoute';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

import { DefaultLayout } from '../components/layouts/default';
import Home from '../screens/Home';
import Trends from '../screens/Trends';
import Login from '../screens/Login';
import ConnectPeople from '../screens/ConnectPeople';
import Profile from '../screens/Profile';
import Messages from '../screens/Messages';
import Notifications from '../screens/Notifications';
import More from '../screens/More';

export const RouterConfig: React.FC = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <PrivateRoute path="/trends">
      <DefaultLayout IsVisibleSearchBox={true} IsVisibleWhoToFollow={true}>
        <Trends />
      </DefaultLayout>
    </PrivateRoute>
    <PrivateRoute path="/connect_people">
      <DefaultLayout IsVisibleSearchBox={true} IsVisibleTrendsForYou={true}>
        <ConnectPeople />
      </DefaultLayout>
    </PrivateRoute>
    <PrivateRoute path="/notifications">
      <DefaultLayout IsVisibleSearchBox={true} IsVisibleTrendsForYou={true} IsVisibleWhoToFollow={true}>
        <Notifications />
      </DefaultLayout>
    </PrivateRoute>
    <PrivateRoute path="/messages">
      <SocketProvider>
        <ConversationsProvider>
          <DefaultLayout IsVisibleChats={true} IsVisibleServiceUsage={false}>
            <Messages />
          </DefaultLayout>
        </ConversationsProvider>
      </SocketProvider>
    </PrivateRoute>
    <PrivateRoute exact path="/user/:id">
      <DefaultLayout IsVisibleSearchBox={true} IsVisibleTrendsForYou={true} IsVisibleWhoToFollow={true}>
        <Profile />
      </DefaultLayout>
    </PrivateRoute>
    <PrivateRoute path="/more">
      <DefaultLayout IsVisibleSearchBox={true} IsVisibleTrendsForYou={true} IsVisibleWhoToFollow={true} >
        <More />
      </DefaultLayout>
    </PrivateRoute>
    <PrivateRoute path="/">
      <DefaultLayout IsVisibleSearchBox={true} IsVisibleTrendsForYou={true} IsVisibleWhoToFollow={true}>
        <Home />
      </DefaultLayout>
    </PrivateRoute>
    <Route>
      <div className="message-empty">
        <div className="message-empty__title"> 404 Sorry, that page doesn’t exist!</div>
        <div className="message-empty__subtitle">We apologize for the inconvenience caused to you.</div>
      </div>
    </Route>
  </Switch >
);

// <Route path="/user/activate/:hash" component={ActivatePage} exact />
