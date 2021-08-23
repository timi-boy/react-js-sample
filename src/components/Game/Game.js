import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.sendOption = this.sendOption.bind(this);
    this.addTimer = this.addTimer.bind(this);

    //this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      options: [],
      points: 0,
      question: '',
      time: 0,
      timeLeft: 0,
      value: '',
      token: '',
      redirect: false,
    };
  }

  addTimer() {
    let timer = setInterval( () => {
      let timeLeft = this.state.time - 1;
      if (timeLeft === 0) {
        clearInterval(timer);
      };
      this.setState({time: timeLeft});
      //console.log(timeLeft);
    }, 1000);
  };

  componentDidMount() {
    const dataGame = JSON.parse(localStorage.getItem('dataGame'));
    const result = JSON.parse(localStorage.getItem('result'));
    this.setState({
      options: dataGame.data.options,
      points: dataGame.data.points,
      question: dataGame.data.question,
      time: dataGame.data.time,
      token: result.data.access_token,
    });
    this.addTimer();
  }

  async sendOption(e) {
    e.preventDefault();
    this.setState({value: e.target.value});

    const url = 'https://internsapi.public.osora.ru/api/game/play';
    console.log(this.state);

    let formData = new FormData();
    let bearer = `Bearer ${this.state.token}`;

    formData.append('answer', this.state.value);
    formData.append('type', '2');
    formData.append('type_hard', '2');

    let request = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
      },
      body: formData,
    });

    let dataGame = await request.json();
    console.log(dataGame);
  };

  render() {
    const { options, points, question, time } = this.state;
    return (
      <div className='game'>
        <p className="game__score">score: {points}</p>
        <p className="game__timer">timer: {time}</p>
        <p className="game__timer">question: {question}</p>
        <div className="game__list">
        { options.map((item) => <input 
        type='button'
        className='game__item'
        key={item.toString()}
        onClick={this.sendOption}
        value={item}
        />) }
        </div>

      </div>
    );
  }
}

export default Game;