import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import './Result.css';

class Result extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.state = {
      points: 0,
      time: 0,
      questions: [],
      redirect: false,
    };
  }

  async componentDidMount() {
    const dataGame = await JSON.parse(localStorage.getItem('dataGame'));
    console.log(dataGame);
    this.setState({
      points: dataGame.data.points,
      questions: dataGame.data.questions,
    });
    console.log(this.state);
  };

  startGame() {
    this.setState({redirect: true});
    localStorage.clear();
  }
  
  render() {

    const { points, questions, redirect} = this.state;
    if (redirect) {
      return (
        <Switch>
            <Redirect exact to='/'/>;
        </Switch>
      )
    }

    return (
      <div className='result'>
        <h1 className='result__title'>game over</h1>
        <h2 className='result__score'>score: {points}</h2>
        <table className='result__table'>
          <thead className='table__head'>
            <tr className='table__string'>
              <th className='table__cell'>Question</th>
              <th className='table__cell'>Answer</th>
              <th className='table__cell'>Correct</th>
            </tr>
          </thead>
          <tbody>
          { questions.map((item) => 
            <tr className='table__string' key={item.id.toString()}>
              <td>{item.question}</td>
              <td>{item.current_answer}</td>
              <td>{item.answer}</td>
            </tr>
          )}
          </tbody>
        </table>
        <button className="result__newGame" onClick={this.startGame}>Новая Игра</button>
      </div>
    )
  }
}

export default Result;