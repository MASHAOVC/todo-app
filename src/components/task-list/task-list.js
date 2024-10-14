import { Component } from 'react';
import './task-list.css';

import Task from '../task';

export default class TaskList extends Component {
  render() {
    const { todos, show, onToggleCompleted, onDeleted } = this.props;

    const elements = todos
      .filter((todo) => {
        switch (show) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })
      .map((el) => {
        const { id, completed } = el;

        let classNames = '';

        if (completed) {
          classNames = 'completed';
        }

        return (
          <li key={id} className={classNames}>
            <Task {...el} onToggleCompleted={onToggleCompleted} onDeleted={onDeleted} />
          </li>
        );
      });
    return <ul className="todo-list">{elements}</ul>;
  }
}
