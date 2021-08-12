import React, { Component } from 'react';
import './Registracion.css';

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
      email: '',
      password: '',
      password_confirmation: '',
    };
  
  };


  nameChange(e) {
    this.setState({name: e.target.value});

    //if (e.target.value.length > 1) {
    //this.setState({validName: true});
    //} else {
    //this.setState({validName: false});
    //}

    //console.log(this.state);
  }

  emailChange(e) {
    this.setState({email: e.target.value});

    //if (e.target.value.length > 1) {
    //  this.setState({validEmail: true});
    //  } else {
    //  this.setState({validEmail: false});
    //  }
    //console.log(this.state);

  }
  
  passChange(e) {
    this.setState({password: e.target.value});
    //if (e.target.value.length > 1) {
    //  this.setState({validPass: true});
    //  } else {
    //  this.setState({validPass: false});
    //  }
    //console.log(this.state);
  }

  passConfChange(e) {
    this.setState({password_confirmation: e.target.value});
    //console.log(this.state);
    //if (e.target.value.length > 1) {
    //  this.setState({validConfPass: true});
    //  } else {
    //  this.setState({validConfPass: false});
    //  }
  }

  async formSubmit(e) {
    e.preventDefault();

    //if (this.state.validName === true &&
    //    this.state.validEmail === true && 
    //    this.state.validPass === true && 
    //    this.state.validConfPass === true) {

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
    //console.log(result);
    //console.log(result.errors.name[0]);
    //if (result.status === false) {
      //this.setState({name: result.errors.name[0]});
      //this.setState({email: result.errors.email[0]});
      //this.setState({password: result.errors.password[0]});
      result.errors.name === undefined ? this.state.name : this.setState({name: result.errors.name[0]});
      result.errors.email === undefined ? this.state.email : this.setState({email: result.errors.email[0]});
      result.errors.password === undefined ? this.state.password : this.setState({password: result.errors.password[0]});
    //}
  }

  

  render() {
    return (
      <div className="registrations">
        <form id="formElem" className='autor-form' onSubmit={this.formSubmit}>
          <label>
            Name: <input
            type="text"
            name="name"
            value={this.state.name}
            
            onChange={this.nameChange}
            />
          </label>

        
          <label>
            e-mail: <input 
            type="email"
            name="name"
            value={this.state.email}
            onChange={this.emailChange}
            />
          </label>
          {this.state.validEmail === false ? <span>Введитe e-mail, поле не может быть пустым</span> : ''}
          <label>
            Password: <input
            type="password"
            name="name"
            value={this.state.password}
            onChange={this.passChange}
            />
          </label>
          {this.state.validPass === false ? <span>Введитe пароль, поле не может быть пустым</span> : ''}
          <label>
            Confirm Password: <input
            type="password"
            name="name"
            value={this.state.password_confirmation}
            onChange={this.passConfChange}
            />
          </label>
          {this.state.validConfPass === false ? <span>Повторите пароль, поле не может быть пустым</span> : ''}
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Registrations;