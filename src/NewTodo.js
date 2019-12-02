import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {

  render() {
    return (
      <div id="new-todo">
        <label htmlFor="new-task"> New To Do: </label>
        <input id="new-task" type="text" name="new-task" value={this.props.input}/>
        <button id="add" type="button" name="add" onClick={this.props.add}> Add </button>
        <button id="sort" type="button" name="sort" onClick={this.props.sortList}> Sort </button>
      </div>
    );
  }
}

export default NewTodo;
