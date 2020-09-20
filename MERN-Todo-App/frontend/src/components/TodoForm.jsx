import React from "react";
import axios from "axios";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formText: "" };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }
  handleChange(evt) {
    this.setState({ formText: evt.target.value });
  }
  addTodo() {
    // console.log(this.state.formText);
    axios
      .post("/api/todos", {
        name: this.state.formText,
      })
      .then((response) => {
        this.props.addTodoArr(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    // console.log(this.props.addTodo);
    return (
      <section className="form">
        <input
          type="text"
          id="todoInput"
          placeholder="Insert your task here..."
          value={this.state.formText}
          onChange={this.handleChange}
        />
        <button onClick={this.addTodo}>ADD TODO</button>
      </section>
    );
  }
}

export default TodoForm;
