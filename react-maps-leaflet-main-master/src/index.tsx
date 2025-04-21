import React from 'react';
import ReactDOM from 'react-dom';
import '../src/style/index.css';
//import App from './ui/App';
import App from './ui/container/App'
import { Provider } from "mobx-react";
import { Router } from "react-router";
import { I18nextProvider } from 'react-i18next';


import i18n from  './i18n/config';

import reportWebVitals from './reportWebVitals';

import { RootStore } from "./store";

const rootStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider {...rootStore}>
        <I18nextProvider i18n={i18n}>
          <Router history={rootStore.history}>
            <App />
          </Router>
        </I18nextProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
