import { useState } from 'react';
import './edit-form.css';

export default function EditForm({ label, id, onEditSave }) {
  const [currentLabel, setCurrentLabel] = useState(label);

  const onLabelChange = (e) => {
    setCurrentLabel(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEditSave(e.target.value, id);
    }
  };

  return (
    <input type="text" className="edit" value={currentLabel} onChange={onLabelChange} onKeyDown={onKeyDown}></input>
  );
}
