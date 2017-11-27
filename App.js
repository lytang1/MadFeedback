/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Feedback from './app/containers/FeedbackContainer';
import Store from './app/config/Store';
import { Provider, connect }  from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

const store = Store();
export default class App extends Component<{}> {
  render() {
    return (
// const store = createStore();
    <Provider store={ store }>
      <Feedback />
    </Provider>
    );
  }
}

