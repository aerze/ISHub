

import './toolbar.styl';
import React from 'react';
import { connect } from 'react-redux';
import sidenav from '../../actions/SideNavActions';

var Toolbar = React.createClass({
  displayName: 'Toolbar',

  devTools() {
    WIN.showDevTools();
  },

  close() {
    WIN.close();
  },

  minimize() {
    WIN.minimize();
  },

  componentWillMount() {
    var manifest = GUI.App.manifest;
    document.title += ' v' + manifest.version
    this.setState({title: document.title});
  },

  render() {
    return (
      <div className="toolbar">
        <button onClick={this.close}
          className="pure-button button-close">
          <i className="lnr lnr-cross"></i></button>

        <button onClick={this.minimize}
          className="pure-button button-min">
          <i className="lnr">—</i></button>

        <button onClick={this.props.toggle}
          className="pure-button button-menu">
          <i className="lnr lnr-menu"></i></button>

        <h6 className="title" id="title">{this.state.title}</h6>

        <button onClick={this.devTools}
          className="pure-button button-dev">
          <i className="lnr lnr-cog"></i></button>
      </div>
    );
  }
});

// filters state to props
var filter = function (state) {
  return {}
};

var map = function (dispatch, props) {
  return {
    open() {
      dispatch(sidenav.open());
    },
    close() {
      dispatch(sidenav.close());
    },
    toggle() {
      dispatch(sidenav.toggle());
    }
  };
};

module.exports = connect(filter, map)(Toolbar);