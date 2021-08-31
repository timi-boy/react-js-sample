import React, { Component } from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import './Home.css';


class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataGame: JSON.parse(localStorage.getItem("dataGame")) || {},
      status: false,
      type:'',
      redirect: false,
    };
  };

  componentDidMount() {
    if (this.state.dataGame.status !== undefined && this.state.dataGame.type === 'start') {
      //console.log(this.dataGame.type);
      this.setState({
        type: 'start',
        redirect: true,
      });
      console.log(this.state);
    };

    if (this.state.dataGame.status !== undefined && this.state.dataGame.type === 'game') {
      //console.log(this.dataGame.type);
      this.setState({
        type: 'game',
        redirect: true,
      });
      console.log(this.state);
    };
  };

  render() {

    const { redirect, type } = this.state;
 
    if (type === 'start' && redirect) {
      return (
        <Switch>
          <Redirect exact to='/continue'/>;
        </Switch>
      )
    };

    if (type === 'game' && redirect) {
      return (
        <Switch>
          <Redirect exact to='/result'/>;
        </Switch>
      )
    };

    return (
      <div className="home">
        <Link className="link" to="/authorization"><div className="home__link">Log In</div></Link>
        <Link className="link" to="/Registration"><div className="home__link">Registration</div></Link>
      </div>
    );
  }
}

export default Home;