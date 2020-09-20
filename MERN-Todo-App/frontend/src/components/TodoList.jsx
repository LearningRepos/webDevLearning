import React from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.addToTodos = this.addToTodos.bind(this);
    this.deleteToTodos = this.deleteToTodos.bind(this);
    this.updateToTodos = this.updateToTodos.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/todos", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((result) => this.setState({ todos: result.data }))
      .catch((error) => console.log(error));
  }
  addToTodos(todoData) {
    this.setState({ todos: [...this.state.todos, todoData] });
  }
  deleteToTodos(todoData) {
    this.setState({
      todos: [...this.state.todos].filter((t) => t._id !== todoData),
    });
  }
  updateToTodos(todoIndex) {
    let tempTodo = this.state.todos;
    tempTodo[todoIndex].completed = !tempTodo[todoIndex].completed;
    this.setState({ todos: tempTodo });
  }
  render() {
    let taskName = this.state.todos.map((t, idx) => (
      <TodoItem
        key={idx}
        idx={idx}
        todoId={t._id}
        name={t.name}
        completed={t.completed}
        deleteTodoArr={this.deleteToTodos}
        updateTodoArr={this.updateToTodos}
      />
    ));
    return (
      <div>
        <header>
          <h1>
            Todo <span>List</span>
          </h1>
          <h2>A simple todo app made with the MERN Stack</h2>
        </header>
        <TodoForm addTodoArr={this.addToTodos} />
        <ul className="list">{taskName}</ul>
      </div>
    );
  }
}

export default TodoList;
