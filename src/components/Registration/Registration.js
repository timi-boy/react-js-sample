import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import './Registration.css';

class Registrations extends Component {
  constructor(props){
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.passConfChange = this.passConfChange.bind(this);
    this.state = {
      name: '',
      aname: '',
      email: '',
      aemail: '',
      password: '',
      apassword: '',
      password_confirmation: '',
      message:'',
      status: false,
      type:'',
      redirect: false,
    };
  };


  nameChange(e) {
    this.setState({name: e.target.value});
  }

  emailChange(e) {
    this.setState({email: e.target.value});
  }
  
  passChange(e) {
    this.setState({password: e.target.value});
  }

  passConfChange(e) {
    this.setState({password_confirmation: e.target.value});
  }

  async formSubmit(e) {
    e.preventDefault();

    const url = 'https://internsapi.public.osora.ru/api/auth/signup';
    console.log(this.state);

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('password_confirmation', this.state.password_confirmation);

    let request = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    let result = await request.json();
    console.log(result);
    if (result.status === true) {
      console.log(result.data.message);
      this.setState({
        status: true,
        message: result.data.message,
        type: result.type,
        redirect: true,
      })
    } else if (result.status === false && result.errors.name !== undefined) {
      this.setState({aname: result.errors.name, type: result.type,});
    };
    if (result.status === false && result.errors.email !== undefined) {
      this.setState({aemail: result.errors.email, type: result.type,});
    };
    if (result.status === false && result.errors.password !== undefined) {
      this.setState({apassword: result.errors.password, type: result.type,});
    };
  }

  render() {
    const { redirect } = this.state;
 
    if (redirect) {
      return (
        <Switch>
          <Redirect exact to='/authorization'/>;
        </Switch>
      )
    };

    return (
      <div className="registrations">
        {this.state.status === true ? <span>{this.state.message}</span> : <span>{this.state.type}</span>}
        <form id="formElem" className='registrations__form' onSubmit={this.formSubmit}>
          <label className='registrations__label'>
            <span className='registrations__caption'>Имя:</span> 
            <input
            className='registrations__input'
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.nameChange}
            />
          </label>
          {this.state.status !== true ? <span>{this.state.aname}</span> : ''}
          <label className='registrations__label'>
            <span className='registrations__caption'>e-mail:</span>
            <input
              className='registrations__input'
              type="email"
              name="name"
              value={this.state.email}
              onChange={this.emailChange}
            />
          </label>
          {this.state.status !== true ? <span>{this.state.aemail}</span> : ''}
          <label className='registrations__label'>
            <span className='registrations__caption'>Пароль:</span> 
            <input
              className='registrations__input'
              type="password"
              name="name"
              value={this.state.password}
              onChange={this.passChange}
            />
          </label>
          {this.state.status !== true ? <span>{this.state.apassword}</span> : ''}
          <label className='registrations__label'>
            <span className='registrations__caption'>Повторите пароль:</span> 
            <input
              className='registrations__input'
              type="password"
              name="name"
              value={this.state.password_confirmation}
              onChange={this.passConfChange}
            />
          </label>
          <input className='registrations__button' type="submit" value="Отправить"/>
        </form>
      </div>
    )
  }
}

export default Registrations;