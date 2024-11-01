import { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor() {
    super();
    this.state = {};
  }

  delayTimeUpdate = () => {
    const { created } = this.props;

    setTimeout(() => {
      this.setState(() => {
        return {
          formattedCreateTime: formatDistanceToNow(created),
        };
      });
    }, 1000);
  }; //it's better to use Life-Cycle Method in such case

  render() {
    const { label, created, completed, onToggleCompleted, onDeleted, id, onEditClick, min, sec } = this.props;
    const { formattedCreateTime } = this.state;

    this.delayTimeUpdate();

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
          <span className="title">{label}</span>
          <span
            className="description"
            onClick={() => {
              onToggleCompleted(id);
            }}
          >
            <button className="icon icon-play"></button>
            <button className="icon icon-pause"></button>
            {` ${min}:${sec}`}
          </span>
          <span className="description"> created {formattedCreateTime || formatDistanceToNow(created)} ago</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            onEditClick(id);
          }}
        ></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            onDeleted(id);
          }}
        ></button>
      </div>
    );
  }
}
