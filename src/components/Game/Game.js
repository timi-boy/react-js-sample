import React, { Component } from 'react';

class Game extends Component {
  constructor(props) {
    super(props);
    this.clickClick = this.clickClick.bind(this);

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

  clickClick(event) {
    console.log('cool');
    console.log(this.state);
  }

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
      //console.log(dataGame.data);
    //console.log(this.state);
    let timer = setInterval( () => {
      var timeLeft = this.state.time - 1;
      if (timeLeft === 0) {
        clearInterval(timer);
      };
      this.setState({timeLeft: timeLeft, time: timer});
    }, 1000); 
    //return this.setState({ time: timer});
  }

  render() {
    const { options, points, time, question, timeLeft } = this.state;
    return (
      <div className='game'>
        <p className="game__score">score: {points}</p>
        <p className="game__timer">timer: {timeLeft}</p>
        <p className="game__timer">question: {question}</p>
        <div className="game__list">
        { options.map((item) => <p className='game__item' key={item.toString()}>{item}</p>) }
        </div>
        <button onClick={this.clickClick}>click</button>
      </div>
    );
  }
}

export default Game;