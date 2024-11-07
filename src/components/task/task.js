import { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor() {
    super();
    this.state = {};
    this.intervalId = null;
  }

  componentDidMount() {
    this.delayTimeUpdate();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  delayTimeUpdate = () => {
    const { created } = this.props;

    this.intervalId = setInterval(() => {
      this.setState(() => {
        return {
          formattedCreateTime: formatDistanceToNow(created),
        };
      });
    }, 1000);
  };

  render() {
    const {
      label,
      created,
      completed,
      onToggleCompleted,
      onDeleted,
      id,
      onEditClick,
      onToggleTimerStart,
      timer,
      onToggleTimerPause,
    } = this.props;
    const { formattedCreateTime } = this.state;

    const displayMin = completed ? '0' : timer.remainingMin;
    const formattedSec = timer.remainingSec < 10 ? `0${timer.remainingSec}` : timer.remainingSec;
    const displaySec = completed ? '00' : formattedSec;

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
            className="title"
            onClick={() => {
              onToggleCompleted(id);
            }}
          >
            {label}
          </span>
          <span className="description description-timer">
            <button
              className="icon icon-play"
              onClick={() => {
                onToggleTimerStart(id);
              }}
            ></button>
            <button
              className="icon icon-pause"
              onClick={() => {
                onToggleTimerPause(id);
              }}
            ></button>
            {` ${displayMin}:${displaySec}`}
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
