import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux/store/configureStore';
import './assets/styles/App.css';

const persistedState = localStorage.getItem('financeState')
  ? JSON.parse(localStorage.getItem('financeState'))
  : {};
const store = configureStore(persistedState);
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    'financeState',
    JSON.stringify({
      account: state.account,
      Intl: state.Intl,
    })
  );
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);