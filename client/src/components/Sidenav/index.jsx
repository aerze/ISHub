
import './Sidenav.styl';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../actions/SideNavActions';

var SideNav = React.createClass({
    displayName: 'SideNav',

    propTypes: {
      sideNavOpen: React.PropTypes.bool
    },

    getDefaultProps() {
      return {
        sideNavOpen: false
      };
    },

    getSideNavPos() {
      var style = {left: '105%'};

      if (this.props.sideNavOpen) style.left = '0px';

      return style;
    },

    getCoverPos() {
      var style = {
        width: '0%',
        height: '100%',
        position: 'fixed'
      };

      if (this.props.sideNavOpen) style.width = '100%';

      return style;
    },

    render() {
        return (
        <div>
          <div style={this.getCoverPos()}
            onClick={this.props.close}>
          </div>
          <ul id="slide-out" className="side-nav fixed" style={this.getSideNavPos()}>
            <li><Link to="localIS" onClick={this.props.close}>My Item Sets</Link></li>
            <li><Link to="importIS" onClick={this.props.close}>Import</Link></li>
            <li><Link to="exportIS" onClick={this.props.close}>Export</Link></li>
            <li><Link to="settings" onClick={this.props.close}>Settings</Link></li>
          </ul>
        </div>
        );
    }
});

// filters state to props
var filter = function (state) {
  return {
    sideNavOpen: state.sideNavOpen
  }
};

var map = function (dispatch, props) {
  return {
    open() {
      dispatch(actions.open());
    },
    close() {
      dispatch(actions.close());
    }
  };
};


module.exports = connect(filter, map)(SideNav);