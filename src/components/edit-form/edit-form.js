import { Component } from 'react';
import './edit-form.css';

export default class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onEditSave(e.target.value, this.props.id);
    }
  };

  render() {
    return (
      <input
        type="text"
        className="edit"
        value={this.state.label}
        onChange={this.onLabelChange}
        onKeyDown={this.onKeyDown}
      ></input>
    );
  }
}
