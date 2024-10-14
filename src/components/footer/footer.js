import { Component } from 'react';
import './footer.css';

import TasksFilter from '../tasks-filter';

export default class Footer extends Component {
  render() {
    const { todos, onDeleteAll, onFilter, show } = this.props;
    let activeCount = 0;

    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].completed) activeCount++;
    }

    return (
      <footer className="footer">
        <span className="todo-count"> {activeCount} items left</span>
        <TasksFilter show={show} onFilter={onFilter} />
        <button
          className="clear-completed"
          onClick={() => {
            onDeleteAll();
          }}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}
