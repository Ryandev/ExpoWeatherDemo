import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Navigator from './navigation';
import reducer from './reducers';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

store = createStore(reducer, applyMiddleware(thunk));

const styles = StyleSheet.create({
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" />       
        <Navigator />
      </Provider>
    );
  }
}

