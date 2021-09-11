import React, { Component } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      uniqueId: 1,
    }

    this.addTodo = this.addTodo.bind(this);
    this.resetTodo = this.resetTodo.bind(this);
  }

  // addTodo(title) {
  addTodo = (title) => {
    const {
      tasks,
      uniqueId,
    } = this.state;

    tasks.push({
      title,
      id: uniqueId,
    });

    this.setState({
      tasks,
      uniqueId: uniqueId + 1,
    });

  }

  resetTodo = () => {
    this.setState({
      tasks: [],
    });
  }

  render() {
    return (
      <div>
        <ht>TODO App</ht>
        <TodoInput addTodo={this.addTodo} />
        <TodoList tasks={this.state.tasks} />
        <button onClick={this.resetTodo}>リセット</button>
      </div>
    )
  };
}
export default App;
