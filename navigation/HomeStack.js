import React from 'react';
import { Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';

export default {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: HomeScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'home',
  }