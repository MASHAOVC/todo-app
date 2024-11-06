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

  // onToggleTimerStart = () => {
  //   const { min, sec } = this.props;
  //   const totalMilliseconds = (min * 60 + sec) * 1000;

  //   this.setState({
  //     startAt: Date.now(),
  //   });

  //   clearInterval(this.intervalId);

  //   this.intervalId = setInterval(() => {
  //     const remainingTime = totalMilliseconds - (Date.now() - this.state.startAt);

  //     if (remainingTime <= 0) {
  //       clearInterval(this.intervalId);
  //       this.setState({ remainingMin: 0, remainingSec: 0 });
  //     } else {
  //       let remainingMin = 0;
  //       let remainingSec = Math.round(remainingTime / 1000);

  //       while (remainingSec >= 60) {
  //         remainingSec -= 60;
  //         remainingMin += 1;
  //       }

  //       this.setState({ remainingMin, remainingSec });
  //     }
  //   }, 1000);
  // };

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

    const displaySec = timer.remainingSec < 10 ? `0${timer.remainingSec}` : timer.remainingSec;

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
                onToggleTimerPause();
              }}
            ></button>
            {` ${timer.remainingMin}:${displaySec}`}
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
