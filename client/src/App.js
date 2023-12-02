import React from 'react';
import Main from './modules/main';
import { Provider } from 'react-redux';
import store from './modules/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
