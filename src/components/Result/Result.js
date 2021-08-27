import React, { Component } from 'react';
//import { Switch, Redirect } from 'react-router-dom';


class Result extends Component {
  constructor(props) {
    super(props);
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
  
  render() {

    const { points, questions } = this.state;
    console.log(questions);

    return (
      <div>
        <h1>game over</h1>
        <h2>score: {points}</h2>
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
          { questions.map((item) => 
            <tr key={item.id.toString()}>
              <td>{item.question}</td>
              <td>{item.current_answer}</td>
              <td>{item.answer}</td>
            </tr>
          )}
          </tbody>
        </table>
        {/*</div>{ questions.map((item) => 
        //  <input 
        //    type='button'
        //    className='game__item'
        //    key={item.id.toString()}

        //    value={item.id} 
        //  />)
        //} */}
      </div>
    )
  }
}

export default Result;