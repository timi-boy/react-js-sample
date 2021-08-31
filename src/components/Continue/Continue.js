import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import './Continue.css';

class Continue extends Component {
  constructor(props){
    super(props);
    this.sendValue = this.sendValue.bind(this);
    this.state = {
      value: null,
      status: false,
      type:'',
      redirect: false,
    };
  };

  async sendValue(e) {
    e.preventDefault();
    if (e.target.value === "Да") {
      this.setState({
        redirect: true,
        type: 'game',
      })
      console.log(this.state);
    }

    if (e.target.value === "Нет") {
      this.setState({
        redirect: true,
        type: 'new',
      });
      localStorage.clear();
    }
  }

  render() {
    const { redirect, type } = this.state;

    if (type === 'game' && redirect) {
      return (
        <Switch>
            <Redirect exact to='/game'/>;
        </Switch>
      )
    }

    if (type === 'new' && redirect) {
      return (
        <Switch>
            <Redirect exact to='/'/>;
        </Switch>
      )
    }

    return (
      <div className="continue">
        <h1 className='continue__title'>Продолжить игру???</h1>
        <input 
        type='button'
        className='continue__button'
        onClick={this.sendValue}
        value="Да"
        />

        <input 
        type='button'
        className='continue__button'
        onClick={this.sendValue}
        value="Нет"
        />
      </div>
    );
  }
}

export default Continue;