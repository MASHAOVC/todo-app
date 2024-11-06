import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  onLabelChange = (e) => {
    this.onInputChange('label', e);
  };

  onMinChange = (e) => {
    this.onInputChange('min', e);
  };

  onSecChange = (e) => {
    this.onInputChange('sec', e);
  };

  onInputChange = (property, event) => {
    this.setState({
      [property]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onItemAdded(this.state.label, +this.state.min, +this.state.sec);

    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.handleSubmit}>
        <button type="submit"></button>
        <input
          className="new-todo"
          type="text"
          name="label"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
          onChange={this.onLabelChange}
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          name="minutes"
          min="1"
          value={this.state.min}
          onChange={this.onMinChange}
          placeholder="Min"
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          name="seconds"
          min="0"
          max="59"
          value={this.state.sec}
          onChange={this.onSecChange}
          placeholder="Sec"
          required
        />
      </form>
    );
  }
}
