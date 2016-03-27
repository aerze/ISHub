

import './ISClient.styl';
import React from 'react';
import Toolbar from '../Toolbar';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { IncrementStep } from '../../actions/actions';

var ISClient = React.createClass({
  displayName: 'ISClient',

  componentDidMount() {
    // $('.button-menu').sideNav();
  },

  clickHandler() {
    this.props.incStep();
  },

  render() {
    console.log(this.props);
    return (
      <div>
        <Toolbar/>
        <div className="window">
          <ul id="slide-out" className="side-nav fixed" style={this.state.navStyle}>
            <li><a>My Item Sets {this.props.step}</a></li>
            <li><Link to="import">Import {this.props.step}</Link></li>
            <li><Link to="export">Export {this.props.step}</Link></li>
            <li><a>Settings {this.props.step}</a></li>
          </ul>
          <div className="content" onClick={this.clickHandler}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

// connect() pulls in redux state and pushes it props
// takes in filter func
var filterStateToProps = function (state) {

  // Don't filter anything, return all state
  return state
};

var mapDispatchToProps = function (dispatch, ownProps) {
  return {
    incStep() {
      dispatch(IncrementStep(1));
    }
  }
};

module.exports = connect(filterStateToProps, mapDispatchToProps)(ISClient);