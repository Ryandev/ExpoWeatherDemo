import React from 'react';
import { Platform } from 'react-native';

import SettingsScreen from '../screens/SettingsScreen';

export default {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: SettingsScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'settings',
  }