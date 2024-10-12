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
      todoData: [this.createTask('Drink Coffee')],
    };
  }

  createTask = (label) => {
    return {
      label,
      created: new Date(),
      id: this.maxId++,
      completed: false,
    };
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      let newArr = todoData.map((el) => {
        if (el.id === id) {
          const newItem = { ...el, completed: !el.completed };
          return newItem;
        }

        return el;
      });

      return { todoData: newArr };
    });
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

  addItem = (text) => {
    const newItem = this.createTask(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <header>
          <h1 className="heading">todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList todos={todoData} onToggleCompleted={this.onToggleCompleted} onDeleted={this.deleteItem} />
          <Footer todos={todoData} />
        </section>
      </section>
    );
  }
}

createRoot(document.getElementById('root')).render(<App />);
