import { Component } from 'react';
import './task-list.css';

import Task from '../task';

export default class TaskList extends Component {
  render() {
    const { todos } = this.props;

    const elements = todos.map((el) => {
      return (
        <li>
          <Task {...el} />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
