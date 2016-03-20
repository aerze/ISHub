

import './toolbar.styl';
import React from 'react';
import GUI from 'GUI';
import $ from 'jquery';

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

  componentDidMount() {
    $('.button-menu').sideNav();
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
        <button data-activates="slide-out"
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

module.exports = Toolbar;