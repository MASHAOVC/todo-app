import { createRoot } from 'react-dom/client';
import { Component } from 'react';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoData: [{ label: 'Drink Coffee' }, { label: 'Make An App' }],
    };
  }

  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
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
