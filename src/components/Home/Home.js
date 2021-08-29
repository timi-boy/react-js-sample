import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Home.css';


class Home extends Component {
  render() {
    return (
      <div className="home">
        <Link className="link" to="/authorization"><div className="home__link">Log In</div></Link>
        <Link className="link" to="/Registration"><div className="home__link">Registration</div></Link>
      </div>
    );
  }
}

export default Home;