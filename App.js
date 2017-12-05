import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import appReducer from './app/redux/reducers/index'
import AppWithNavigationState from './app/screens/AppWithNavigationState'


let store = createStore(appReducer, {}, applyMiddleware(thunkMiddleware))

export default class Prontto extends React.Component {
  render() {
      return <Provider store={store}><AppWithNavigationState/></Provider>;
  }
}