import { createRoot } from 'react-dom/client';
import { Component } from 'react';

import './index.css';
import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoData: [
        { label: 'Drink Coffee', created: new Date(), id: 1 },
        { label: 'Make An App', created: new Date(), id: 2 },
      ],
    };
  }

  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <header>
          <h1 className="heading">todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todos={todoData} />
          <Footer />
        </section>
      </section>
    );
  }
}

createRoot(document.getElementById('root')).render(<App />);
