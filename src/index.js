import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Layout from './components/layout';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
