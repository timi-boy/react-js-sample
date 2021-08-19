import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pila from '../../pila.png';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <Link className="link" to="/"><img src={pila} className="App-logo" alt="logo" /></Link>
        <h1 className="App-title">Я хочу сыграть с тобой в одну игру</h1>
      </div>
    )
  };
}

export default Header;
