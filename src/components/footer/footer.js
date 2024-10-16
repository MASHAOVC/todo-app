import { Component } from 'react';
import './footer.css';

import TasksFilter from '../tasks-filter';

export default class Footer extends Component {
  countActive = () => {
    const { todos } = this.props;
    let activeCount = 0;

    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].completed) activeCount++;
    }

    return activeCount;
  };

  render() {
    const { onDeleteAll, onFilter, show } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count"> {this.countActive()} items left</span>
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
