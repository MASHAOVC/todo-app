import { Component } from 'react';
import './task-list.css';

import Task from '../task';

export default class TaskList extends Component {
  render() {
    const { todos, onToggleCompleted } = this.props;

    const elements = todos.map((el) => {
      const { id, completed } = el;

      let classNames = '';

      if (completed) {
        classNames = 'completed';
      }

      return (
        <li key={id} className={classNames}>
          <Task {...el} onToggleCompleted={onToggleCompleted} />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
