/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import RootNavigation from "./RootNavigation";
import { Provider } from "react-redux";
import { store, persistor } from "./Store";
import { PersistGate } from "redux-persist/integration/react";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
