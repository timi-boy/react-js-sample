import React, { Component } from 'react';
import './Authorization.css';
import { Switch, Redirect } from 'react-router-dom';

class Authorization extends Component {
  constructor(props){
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.state = {
      email: '',
      aemail: '',
      password: '',
      apassword: '',
      message:'',
      status: false,
      type:'',
      redirect: false,
    };
  };

  emailChange(e) {
    this.setState({email: e.target.value});
  }
  
  passChange(e) {
    this.setState({password: e.target.value});
  }

  async formSubmit(e) {
    e.preventDefault();

    const url = 'https://internsapi.public.osora.ru/api/auth/login';
    console.log(this.state);

    let formData = new FormData();

    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    let request = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    let result = await request.json();
    console.log(result);

    if (result.status === true) {
      this.setState({
        status: result.status,
        type: result.type,
        redirect: true,
      })
      localStorage.setItem('result', JSON.stringify(result));
      console.log(this.state);
    };
    if (result.status === false && result.errors !== undefined) {
      this.setState({aemail: result.errors, type: result.type,});
      console.log(this.state);
    };
    if (result.status === false && result.errors.password !== undefined) {
      this.setState({apassword: result.errors.password, type: result.type,});
      console.log(this.state);
    };
  }
  
  render() {
    const { redirect, status } = this.state;
 
    if (redirect) {
      return (
        <Switch>
          <Redirect exact to='/select'/>;
        </Switch>
      )
    };

    return (
      <div className="authorization">
        {this.state.status === false ? <span>{this.state.type}</span> : ''}
        <form className='autor-form' onSubmit={this.formSubmit}>
          <label>
            e-mail: <input 
            type="email"
            name="name"
            value={this.state.email}
            onChange={this.emailChange}
            />
          </label>
          {status === false ? <span>{this.state.aemail}</span> : ''}
          <label>
            Password: <input
            type="password"
            name="name"
            value={this.state.password}
            onChange={this.passChange}
            />
          </label>
          {status === false ? <span>{this.state.apassword}</span> : ''}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Authorization;