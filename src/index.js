import { createRoot } from 'react-dom/client';
import { Component } from 'react';

import './index.css';
import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

class App extends Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      todoData: [],
      show: 'all',
    };
  }

  createTask = (label, min, sec) => {
    return {
      label,
      created: new Date(),
      id: this.maxId++,
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

  updateTask = (id, cb) => {
    this.setState(({ todoData }) => {
      let newArr = todoData.map((el) => {
        if (el.id === id) {
          const newItem = cb(el);
          return newItem;
        }

        return el;
      });

      return { todoData: newArr };
    });
  };

  onToggleCompleted = (id) => {
    this.updateTask(id, (el) => ({ ...el, completed: !el.completed }));
  };

  onEditClick = (id) => {
    this.updateTask(id, (el) => ({ ...el, editing: !el.editing }));
  };

  onEditSave = (text, id) => {
    this.updateTask(id, (el) => ({ ...el, editing: !el.editing, label: text }));
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      const newArr = [...before, ...after];

      return {
        todoData: newArr,
      };
    });
  };

  addItem = (text, min, sec) => {
    const newItem = this.createTask(text, min, sec);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.completed);

      return {
        todoData: newArr,
      };
    });
  };

  onFilter = (string) => {
    this.setState({
      show: string,
    });
  };

  onToggleTimerStart = (id) => {
    const { todoData } = this.state;

    const currentObj = todoData.find((el) => el.id === id);
    const { remainingMin, remainingSec, intervalId } = currentObj.timer;

    if (intervalId) return;

    const totalMilliseconds = (remainingMin * 60 + remainingSec) * 1000;
    const startAt = Date.now();

    this.updateTask(id, (el) => ({ ...el, timer: { ...el.timer, startAt } }));

    clearInterval(currentObj.timer.intervalId);

    const newIntervalId = setInterval(() => {
      const remainingTime = totalMilliseconds - (Date.now() - startAt);

      if (remainingTime <= 0) {
        clearInterval(newIntervalId);

        this.updateTask(id, (el) => ({
          ...el,
          timer: { ...el.timer, remainingMin: 0, remainingSec: 0, intervalId: null },
        }));
      } else {
        let remainingMin = 0;
        let remainingSec = Math.round(remainingTime / 1000);

        while (remainingSec >= 60) {
          remainingSec -= 60;
          remainingMin += 1;
        }

        this.updateTask(id, (el) => ({ ...el, timer: { ...el.timer, remainingMin, remainingSec } }));
      }
    }, 1000);

    this.updateTask(id, (el) => ({
      ...el,
      timer: { ...el.timer, intervalId: newIntervalId },
    }));
  };

  onToggleTimerPause = () => {};

  render() {
    const { todoData, show } = this.state;

    return (
      <section className="todoapp">
        <header>
          <h1 className="heading">todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            show={show}
            onToggleCompleted={this.onToggleCompleted}
            onDeleted={this.deleteItem}
            onEditClick={this.onEditClick}
            onEditSave={this.onEditSave}
            onToggleTimerStart={this.onToggleTimerStart}
            onToggleTimerPause={this.onToggleTimerPause}
          />
          <Footer onDeleteAll={this.deleteCompletedItems} onFilter={this.onFilter} todos={todoData} show={show} />
        </section>
      </section>
    );
  }
}

createRoot(document.getElementById('root')).render(<App />);
