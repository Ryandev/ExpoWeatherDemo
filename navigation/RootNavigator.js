import React from 'react';
import { createAppContainer, createNavigator, createSwitchNavigator, StackView, StackRouter } from 'react-navigation';

import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';
import DetailStack from './DetailStack';

const RootNavigator = createNavigator(
	StackView,
	StackRouter({
	  Home: HomeStack,
	  Detail: DetailStack,
	  Settings: SettingsStack,
	}), 
	{
	  initialRouteName: 'Home',
	});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;