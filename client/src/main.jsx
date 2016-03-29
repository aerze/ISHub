

import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import Store from './stores/store';

import ISClient from './components/ISClient';

import LocalISView from './views/LocalIS';
import ImportISView from './views/ImportIS';
import ExportISView from './views/ExportIS';
import SettingsView from './views/Settings';

ReactDOM.render(
  <Provider store={Store} >
    <Router history={hashHistory} >
      <Route path="/" component={ISClient}>
        <IndexRedirect to="/localIS" />
        <Route path="localIS" component={LocalISView} />
        <Route path="importIS" component={ImportISView} />
        <Route path="exportIS" component={ExportISView} />
        <Route path="settings" component={SettingsView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
