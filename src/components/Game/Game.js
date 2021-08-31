import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.sendOption = this.sendOption.bind(this);
    this.state = {
      options: [],
      points: 0,
      question: '',
      time: 0,
      timeLeft: 0,
      value: null,
      token: '',
      //type_hard: null,
      redirect: false,
    };
    this.timer = null;
  }

  async componentDidMount() {
    const dataGame = await JSON.parse(localStorage.getItem('dataGame'));
    const result = await JSON.parse(localStorage.getItem('result'));
    //this.setState({
    //  options: dataGame.data.options,
    //  points: dataGame.data.points,
    //  question: dataGame.data.question,
    //  time: dataGame.data.time,

    //  token: result.data.access_token,
    //});
    this.setState((prevState) => {
      //console.log(prevState); 
      return { 
        options: dataGame.data.options,
        points: dataGame.data.points,
        question: dataGame.data.question,
        time: dataGame.data.time,
  
        token: result.data.access_token,
      }
    });

    this.timer = setInterval( () => {
      let timeLeft = this.state.time - 1;
      if (timeLeft === 0) {
        clearInterval(this.timer);
      };
      this.setState({time: timeLeft});
    }, 1000);
  }

  async sendOption(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
    const url = 'https://internsapi.public.osora.ru/api/game/play';
    let formData = new FormData();
    let bearer = `Bearer ${this.state.token}`;
    formData.append('answer', e.target.value);
    formData.append('type', '2');
    formData.append('type_hard', '1');
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
      this.setState((prevState) => {
        //console.log(prevState); 
        return { 
          options: dataGame.data.options,
          points: dataGame.data.points,
          question: dataGame.data.question,
          time: dataGame.data.time,
        }
      });
      clearInterval(this.timer);
      this.timer = setInterval( () => {
        let timeLeft = this.state.time - 1;
        if (timeLeft === 0) {
          clearInterval(this.timer);
        };
        this.setState((prevState) => {
          return {time: timeLeft}
        });
        //console.log(timeLeft);
      }, 1000);
    }

    if (dataGame.status === true && dataGame.data.questions !== undefined) {
      clearInterval(this.timer);
      console.log(dataGame);
      localStorage.setItem('dataGame', JSON.stringify(dataGame));
      this.setState({
        redirect: true,
      })
    }
  }

  render() {
    const { redirect, options, points, question, time } = this.state;

    if (redirect) {
      return (
        <Switch>
          <Redirect exact to='/result'/>;
        </Switch>
      )
    };

    return (
      <div className='game'>
        <p className="game__text">score: {points}</p>
        <p className="game__text">timer: {time}</p>
        <p className="game__text">question: {question}</p>
        <div className="game__list">
        { options !== undefined ? options.map((item) => <input 
        type='button'
        className='game__item'
        key={item.toString()}
        onClick={this.sendOption}
        value={item}
        />) : 'null'}
        </div>

      </div>
    );
  }
}

export default Game;