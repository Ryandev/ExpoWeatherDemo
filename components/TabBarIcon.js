import React from 'react';
import { Icon } from 'expo';

import Theme from '../constants/Theme';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={16}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Theme.tab.iconSelected : Theme.tab.iconDefault}
      />
    );
  }
}