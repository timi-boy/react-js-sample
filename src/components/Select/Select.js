import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';


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
    this.setState({value: event.target.value});
  }

  componentDidMount() {
    const result = JSON.parse(localStorage.getItem('result'));
    this.setState({token: result.data.access_token})
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
      this.setState({
        redirect: true,
      })
      localStorage.setItem('dataGame', JSON.stringify(dataGame));
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
            <option disabled value=''>Выберите сложность</option>
            <option value='1'>Easy / Легко</option>
            <option value='2'>Hard / Тяжело</option>
          </select>
          <input type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
}

export default Select;