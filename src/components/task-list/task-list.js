import './task-list.css';

import Task from '../task';
import EditForm from '../edit-form/edit-form';

export default function TaskList({
  todos,
  show,
  onToggleCompleted,
  onDeleted,
  onEditClick,
  onEditSave,
  onToggleTimerStart,
  onToggleTimerPause,
}) {
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
      const { id, completed, editing } = el;

      let classNames = '';

      if (editing) {
        classNames = 'editing';
      }

      if (completed) {
        classNames = 'completed';
      }

      return (
        <li key={id} className={classNames}>
          {editing ? (
            <EditForm {...el} onEditSave={onEditSave} />
          ) : (
            <Task
              {...el}
              onToggleCompleted={onToggleCompleted}
              onDeleted={onDeleted}
              onEditClick={onEditClick}
              onToggleTimerStart={onToggleTimerStart}
              onToggleTimerPause={onToggleTimerPause}
            />
          )}
        </li>
      );
    });
  return <ul className="todo-list">{elements}</ul>;
}
