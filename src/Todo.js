import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <span className="toDoTask">
        <button className="checkbox"> &#10004; </button>
        <p> {this.props.text} </p>
        <button className="deleteBtn"> X </button>
      </span>
    );
  }
}

export default Todo;
