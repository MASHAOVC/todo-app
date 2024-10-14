import { Component } from 'react';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  render() {
    const { onFilter, show } = this.props;

    let className = '';
    let activeClassName = '';
    let completedClassName = '';

    switch (show) {
      case 'active':
        className = '';
        completedClassName = '';
        activeClassName = 'selected';
        break;
      case 'completed':
        className = '';
        completedClassName = '';
        completedClassName = 'selected';
        break;
      default:
        className = 'selected';
        completedClassName = '';
        completedClassName = '';
    }

    return (
      <ul className="filters">
        <li>
          <button
            className={className}
            onClick={() => {
              onFilter('all');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={activeClassName}
            onClick={() => {
              onFilter('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={completedClassName}
            onClick={() => {
              onFilter('completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
