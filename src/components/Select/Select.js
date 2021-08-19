import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Отправленное имя: ' + this.state.value);
    event.preventDefault();
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select name="" id="">
            <option disabled value >Выберите сложность</option>
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