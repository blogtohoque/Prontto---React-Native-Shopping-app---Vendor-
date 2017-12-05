import React from 'react';

import {
  TabNavigator,
  StackNavigator,
  StackRouter
} from 'react-navigation';

import Splash from './Splash'
import Auth from './Auth'
import Home from './Home'
import Scanner from './Scanner'

const HomeNavigator = StackNavigator(
  {
    main: { screen: Home },
  },
  {
    headerMode: 'none',
  },
);

const MainNavigator = StackNavigator(
  {
    splash: {screen: Splash},
    auth: { screen: Auth },
    home: { screen: Home },
  },
  {
    headerMode: 'none',
  },
);

export default MainNavigator;
