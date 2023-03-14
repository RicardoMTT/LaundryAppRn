import React from 'react';
import {Provider} from 'react-redux';
import StackNavigator from './StackNavigator';
import store from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}
export default App;
