import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props)
    this.delete=this.delete.bind(this);
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

      } else if (this.readyState === 4){
        console.log(this.responseText);
      }
    }
      xhttp5.open("PUT", "https://cse204.work/todos/"+this.props.id, true);
      xhttp5.setRequestHeader("Content-type", "application/json");
      xhttp5.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
      xhttp5.send(JSON.stringify(data));
  }
  delete(event){
    const self = this;
    var xhttp4 = new XMLHttpRequest();
    // Response handler
    xhttp4.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState === 4 && this.status === 200) {
            // parse JSON response
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            var newList = [...self.state.todos];
            var index = newList.indexTarget(todo);
            if (index!==-1){
              newList.splice(index,1);
              self.setState({todos:newList});
            }
        } else if (this.readyState === 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };
    xhttp4.open("DELETE", "https://cse204.work/todos/"+this.props.id, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
    xhttp4.send();
  }
  render() {
    return (
      //how to add toDoTask class name
      <span className="toDoTask" id={this.props.id}>
        <button onClick={this.check} className="checkbox"> &#10004; </button>
        <p className={this.props.completed ? "completed" : "not-completed"}> {this.props.text} </p>
        <button onClick={this.delete} className="deleteBtn"> X </button>
      </span>
    );
  }
}

export default Todo;
