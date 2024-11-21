import { createRoot } from 'react-dom/client';
import { useState } from 'react';

import './index.css';
import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';
import { parseTime } from './utils/parse-time';

function App() {
  const [maxId, setMaxId] = useState(100);
  const [todoData, setTodoData] = useState([]);
  const [show, setShow] = useState('all');

  const createTask = (label, min, sec) => {
    setMaxId((prevMaxId) => prevMaxId + 1);

    return {
      label,
      created: new Date(),
      id: maxId,
      completed: false,
      editing: false,
      timer: {
        startAt: null,
        remainingMin: min,
        remainingSec: sec,
        intervalId: null,
      },
    };
  };

  const updateTask = (id, cb) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((el) => {
        if (el.id === id) {
          const newItem = cb(el);
          return newItem;
        }

        return el;
      });
    });
  };

  const onToggleCompleted = (id) => {
    const currentObj = findTaskById(id);
    const { intervalId } = currentObj.timer;

    updateTask(id, (el) => ({ ...el, completed: !el.completed, timer: { ...el.timer, intervalId: null } }));

    clearInterval(intervalId);
  };

  const onEditClick = (id) => {
    updateTask(id, (el) => ({ ...el, editing: !el.editing }));
  };

  const onEditSave = (text, id) => {
    updateTask(id, (el) => ({ ...el, editing: !el.editing, label: text }));
  };

  const deleteItem = (id) => {
    const currentObj = findTaskById(id);
    const { intervalId } = currentObj.timer;

    clearInterval(intervalId);

    setTodoData((prevtodoData) => {
      const idx = prevtodoData.findIndex((el) => el.id === id);

      const before = prevtodoData.slice(0, idx);
      const after = prevtodoData.slice(idx + 1);

      const newTodoData = [...before, ...after];

      return newTodoData;
    });
  };

  const addItem = (text, min, sec) => {
    const newItem = createTask(text, min, sec);

    setTodoData((prevTodoData) => {
      const newTodoData = [...prevTodoData, newItem];
      return newTodoData;
    });
  };

  const deleteCompletedItems = () => {
    setTodoData((prevTodoData) => {
      const newTodoData = [];
      prevTodoData.forEach((el) => (!el.completed ? newTodoData.push(el) : clearInterval(el.timer.intervalId)));

      return newTodoData;
    });
  };

  const onFilter = (string) => {
    setShow(string);
  };

  const onToggleTimerStart = (id) => {
    const currentObj = findTaskById(id);
    const { remainingMin, remainingSec, intervalId } = currentObj.timer;

    if (intervalId) return;

    const totalMilliseconds = (remainingMin * 60 + remainingSec) * 1000;
    const startAt = Date.now();

    updateTask(id, (el) => ({ ...el, timer: { ...el.timer, startAt } }));

    const newIntervalId = setInterval(() => {
      const remainingTime = totalMilliseconds - (Date.now() - startAt);

      if (remainingTime <= 0) {
        clearInterval(newIntervalId);

        updateTask(id, (el) => ({
          ...el,
          timer: { ...el.timer, remainingMin: 0, remainingSec: 0 },
        }));
      } else {
        const { min, sec } = parseTime(remainingTime);

        updateTask(id, (el) => ({ ...el, timer: { ...el.timer, remainingMin: min, remainingSec: sec } }));
      }
    }, 1000);

    updateTask(id, (el) => ({
      ...el,
      timer: { ...el.timer, intervalId: newIntervalId },
    }));
  };

  const onToggleTimerPause = (id) => {
    const currentObj = findTaskById(id);
    const { intervalId } = currentObj.timer;

    clearInterval(intervalId);

    updateTask(id, (el) => ({ ...el, timer: { ...el.timer, intervalId: null } }));
  };

  const findTaskById = (id) => {
    const currentObj = todoData.find((el) => el.id === id);

    return currentObj;
  };

  return (
    <section className="todoapp">
      <header>
        <h1 className="heading">todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          show={show}
          onToggleCompleted={onToggleCompleted}
          onDeleted={deleteItem}
          onEditClick={onEditClick}
          onEditSave={onEditSave}
          onToggleTimerStart={onToggleTimerStart}
          onToggleTimerPause={onToggleTimerPause}
        />
        <Footer onDeleteAll={deleteCompletedItems} onFilter={onFilter} todos={todoData} show={show} />
      </section>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
