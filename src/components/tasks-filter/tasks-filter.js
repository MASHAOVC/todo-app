import './tasks-filter.css';
import PropTypes from 'prop-types';
import { context } from '../../context';
import { useContext } from 'react';

export default function TasksFilter({ onFilter }) {
  const show = useContext(context);

  const getClassNames = () => {
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

  let { className, activeClassName, completedClassName } = getClassNames();

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

// Устанавливаем проверки типов для пропсов
TasksFilter.propTypes = {
  show: PropTypes.string,
};
