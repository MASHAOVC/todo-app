import { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { label, created, completed, onToggleCompleted, id } = this.props;
    const { formattedCreateTime } = this.state;

    setTimeout(() => {
      this.setState(() => {
        return {
          formattedCreateTime: formatDistanceToNow(created),
        };
      });
    }, 1000); //it's better to use Life-Cycle Method in such case

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => {
            onToggleCompleted(id);
          }}
        />
        <label>
          <span
            className="description"
            onClick={() => {
              onToggleCompleted(id);
            }}
          >
            {label}
          </span>
          <span className="created"> created {formattedCreateTime || formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    );
  }
}
