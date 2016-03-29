
import { createStore, applyMiddleware } from 'redux';
// Thunk is used for async actions
import Thunk from 'redux-thunk';

var defaultState = {
  step: 0,
  sideNavOpen: false,
  title: 'ISClient',
  version: 'v1.1.1'
};

var ISCReducer = function (state, actionPayload) {
  state = state || defaultState;

  switch (actionPayload.type) {
    case 'TEST_ACTION':
      console.log('Action Caught: ', actionPayload.type, '\tPayload: ', actionPayload)
    return { step: state.step + actionPayload.step };

    case 'SIDENAV':
      console.log('sidenav caught');
    return { sideNavOpen: actionPayload.isOpen }

    case 'SIDENAV_TOGGLE':
      console.log('sidenav toggle');
    return { sideNavOpen: (!state.sideNavOpen) }

    default:
    return state;
  }
};

// TODO: NOPENOPENOPENOPE
var store = applyMiddleware(Thunk)(createStore)(ISCReducer)


module.exports = store;
