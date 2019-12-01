import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {

  render() {
    return (
      <span id="new-todo">
        <label htmlFor="new-task"> New To Do: </label>
        <input id="new-task" type="text" name="new-task" />
        <button id="add" type="button" name="add" onClick={this.props.add}> Add </button>
      </span>
    );
  }
}

export default NewTodo;
