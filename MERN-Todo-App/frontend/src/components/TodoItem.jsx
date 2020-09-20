import React from "react";
import axios from "axios";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickX = this.handleClickX.bind(this);
    this.handleClickL = this.handleClickL.bind(this);
  }
  handleClickX() {
    axios
      .delete("/api/todos/" + this.props.todoId)
      .then((response) => {
        this.props.deleteTodoArr(this.props.todoId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleClickL() {
    console.log(this.props.idx);
    axios
      .put("/api/todos/" + this.props.todoId, {
        completed: !this.props.completed,
      })
      .then((response) => {
        console.log(response.data);
        this.props.updateTodoArr(this.props.idx);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div class="TodoItem">
        <li
          onClick={this.handleClickL}
          className={this.props.completed ? "task done" : "task"}
        >
          {this.props.name}
        </li>
        <span class="span" onClick={this.handleClickX}>
          X
        </span>
      </div>
    );
  }
}

export default TodoItem;
