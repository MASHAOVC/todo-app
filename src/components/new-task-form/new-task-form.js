import { useState } from 'react';
import './new-task-form.css';

export default function NewTaskForm({ onItemAdded }) {
  const [state, setState] = useState({
    label: '',
    min: '',
    sec: '',
  });

  const onLabelChange = (e) => {
    onInputChange('label', e);
  };

  const onMinChange = (e) => {
    onInputChange('min', e);
  };

  const onSecChange = (e) => {
    onInputChange('sec', e);
  };

  const onInputChange = (property, event) => {
    setState((prevState) => ({ ...prevState, [property]: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onItemAdded(state.label, +state.min, +state.sec);

    setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <button type="submit"></button>
      <input
        className="new-todo"
        type="text"
        name="label"
        placeholder="What needs to be done?"
        autoFocus
        value={state.label}
        onChange={onLabelChange}
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        name="minutes"
        min="1"
        value={state.min}
        onChange={onMinChange}
        placeholder="Min"
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        name="seconds"
        min="0"
        max="59"
        value={state.sec}
        onChange={onSecChange}
        placeholder="Sec"
        required
      />
    </form>
  );
}
