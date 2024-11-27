import './footer.css';
import TasksFilter from '../tasks-filter';

export default function Footer({ onDeleteAll, onFilter, todos }) {
  const countActive = () => {
    let activeCount = 0;

    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].completed) activeCount++;
    }

    return activeCount;
  };

  return (
    <footer className="footer">
      <span className="todo-count"> {countActive()} items left</span>
      <TasksFilter onFilter={onFilter} />
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
