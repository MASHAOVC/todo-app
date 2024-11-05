import { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startAt: null,
      remainingMin: props.min,
      remainingSec: props.sec,
    };
    this.intervalId = null;
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  onToggleTimerStart = () => {
    const { min, sec } = this.props;
    const totalMilliseconds = (min * 60 + +sec) * 1000;

    this.setState({
      startAt: new Date(),
    });

    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const remainingTime = totalMilliseconds - (new Date() - this.state.startAt);

      if (remainingTime <= 0) {
        clearInterval(this.intervalId);
        this.setState({ remainingMin: 0, remainingSec: 0 });
      } else {
        const remainingMin = Math.floor(remainingTime / 60000);
        const remainingSec = Math.floor((remainingTime % 60000) / 1000);

        this.setState({ remainingMin, remainingSec });
      }
    }, 1000);
  };

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
    const { label, created, completed, onToggleCompleted, onDeleted, id, onEditClick } = this.props;
    const { formattedCreateTime, remainingMin, remainingSec } = this.state;

    const displaySec = remainingSec < 10 ? `0${remainingSec}` : remainingSec;

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
                this.onToggleTimerStart();
              }}
            ></button>
            <button className="icon icon-pause"></button>
            {` ${remainingMin}:${displaySec}`}
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
