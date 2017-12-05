import { combineReducers } from 'redux';
import * as homeReducers from './home'
import * as authReducers from './auth'

export default combineReducers(Object.assign(
  authReducers,
  homeReducers,
));
