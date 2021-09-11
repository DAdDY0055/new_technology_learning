import React, { Component } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          title: 'デフォルトTODO',
          id: 0
        },
      ],
      uniqueId: 1,
    }

    this.addTodo = this.addTodo.bind(this);
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

  render() {
    return (
      <div>
        <ht>TODO App</ht>
        <TodoInput addTodo={this.addTodo} />
        <TodoList tasks={this.state.tasks} />
      </div>
    )
  };
}
export default App;
