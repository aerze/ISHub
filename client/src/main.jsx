

import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import Store from './stores/store';

import ISClient from './components/ISClient';
import ImportPage from './components/Import';
import ExportPage from './components/Export';

ReactDOM.render(
  <Provider store={Store} >
    <Router history={hashHistory} >
      <Route path="/" component={ISClient}>
        <IndexRedirect to="/import" />
        <Route path="import" component={ImportPage} />
        <Route path="export" component={ExportPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));



