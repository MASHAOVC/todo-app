import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onItemAdded(e.target.value);

      this.setState({
        label: '',
      });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={this.state.label}
        onChange={this.onLabelChange}
        onKeyDown={this.onKeyDown}
      />
    );
  }
}
