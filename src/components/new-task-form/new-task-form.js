import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  onSubmit = () => {};

  render() {
    return <input className="new-todo" placeholder="What needs to be done?" autoFocus onSubmit={() => {}} />;
  }
}
