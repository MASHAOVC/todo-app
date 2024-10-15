import { Component } from 'react';
import './tasks-filter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    show: 'all',
  };

  static propTypes = {
    show: PropTypes.string,
  };

  getClassNames = () => {
    const { show } = this.props;

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

    return { className, activeClassName, completedClassName };
  };

  render() {
    const { onFilter } = this.props;

    let { className, activeClassName, completedClassName } = this.getClassNames();

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
