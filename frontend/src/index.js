import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import Routes from './routes';
import store, { history } from './redux/store';
import './index.css';
import * as serviceWorker from './serviceWorker';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
