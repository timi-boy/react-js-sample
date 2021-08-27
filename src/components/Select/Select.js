import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import './Select.css';



class Select extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      value: '',
      token: '',
      redirect: false,
    };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
    console.log(event.target.value);

  }

  async componentDidMount() {
    const result = await JSON.parse(localStorage.getItem('result'));
    this.setState({token: result.data.access_token});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const url = 'https://internsapi.public.osora.ru/api/game/play';
    console.log(this.state);

    let formData = new FormData();
    let bearer = `Bearer ${this.state.token}`;

    formData.append('type_hard', this.state.value);
    formData.append('type', '1');

    let request = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
      },
      body: formData,
    });

    let dataGame = await request.json();
    console.log(dataGame);
    
    if (dataGame.status === true) {
      Object.assign(dataGame, {type_hard: this.state.value});
      localStorage.setItem('dataGame', JSON.stringify(dataGame));
      this.setState({
        redirect: true,
      })
    };

  }

  render() {
    const { redirect } = this.state;
 
    if (redirect) {
      return (
        <Switch>
          <Redirect exact to='/game'/>;
        </Switch>
      )
    };

    return (
      <div className='select-box'>
        <form className='select-box__form' onSubmit={this.handleSubmit}>
          <select className='select__select' value={this.state.value} onChange={this.handleChange}>
            <option className='select__option' disabled value=''>Выберите сложность</option>
            <option className='select__option' value='1'>Easy / Легко</option>
            <option className='select__option' value='2'>Hard / Тяжело</option>
          </select>
          <input className='select__button' type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
}

export default Select;