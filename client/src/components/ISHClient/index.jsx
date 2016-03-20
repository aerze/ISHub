

import './ISHClient.styl';
import React from 'react';
import Toolbar from '../Toolbar';

var ISHClient = React.createClass({
  displayName: 'ISHClient',

  componentDidMount() {
    $('.button-menu').sideNav();
  },

  render() {
    return (
      <div>
        <Toolbar/>
        <div className="window">
          <ul id="slide-out" className="side-nav fixed">
            <li><a>My Item Sets</a></li>
          </ul>
          <div className="content">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ISHClient;