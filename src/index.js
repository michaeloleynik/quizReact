import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
}) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const Application = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <Application/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
