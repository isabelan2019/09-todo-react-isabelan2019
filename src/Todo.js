import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props)
    this.state={
      completed:this.props.completed
    }
    this.check=this.check.bind(this);
  }
  check(event){
    const self = this;
    var data = {
      completed: !this.props.completed
    }
    var xhttp5 = new XMLHttpRequest();
    xhttp5.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var todo = JSON.parse(this.responseText);
        console.log(todo);
        self.setState({completed:true});
      } else if (this.readyState === 4){
        console.log(this.responseText);
      }
    }
      xhttp5.open("PUT", "https://cse204.work/todos/"+this.props.id, true);
      xhttp5.setRequestHeader("Content-type", "application/json");
      xhttp5.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
      xhttp5.send(JSON.stringify(data));
  }

  render() {
    var className="toDoTask";
    if (this.state.completed){
      className="toDoTask completed";
    }
    return (
      //how to add toDoTask class name
      <span className={className} id={this.props.id}>
        <button onClick={this.check} className="checkbox"> &#10004; </button>
        <p> {this.props.text} </p>
        <button onClick={this.props.delete} className="deleteBtn"> X </button>
      </span>
    );
  }
}

export default Todo;
