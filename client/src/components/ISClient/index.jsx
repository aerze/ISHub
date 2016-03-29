

import './ISClient.styl';
import React from 'react';
import Toolbar from '../Toolbar';
import SideNav from '../SideNav';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import { IncrementStep } from '../../actions/actions';

var ISClient = React.createClass({
  displayName: 'ISClient',

  clickHandler() {
    this.props.incStep();
  },

  render() {
    console.log(this.props);
    return (
      <div>
        <Toolbar/>
        <div className="window">
          <SideNav />
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