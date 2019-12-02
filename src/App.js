import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  constructor(){
    super()
    this.state={todos:[]}
    this.add=this.add.bind(this);
  }

  componentDidMount(){
    const self = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var todos = JSON.parse(this.responseText);
            console.log(todos);
            self.setState({todos:todos});
          }
    };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key","62a83b-dd0595-259c51-78553e-b3f8de");
    xhttp.send();
  }

  add(){
    const self = this;
    var data = {
        text: document.getElementById("new-task").value
    }
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // Response handler
    xhttp2.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState === 4 && this.status === 200) {
            // parse JSON response
            var todo = JSON.parse(this.responseText);
            self.setState({todos:[...self.state.todos,todo]});
            console.log(todo);
        } else if (this.readyState === 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };
    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
    xhttp2.send(JSON.stringify(data));
  }

  render() {
    return (
      <div className="App">
        <h1>Isabel's To Do App</h1>
        <div id="todo-list">
          <NewTodo add={this.add}/>
          {this.state.todos.map((todo)=>
          <Todo key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                created={todo.created} />)}
        </div>
      </div>

    );
  }
}

export default App;
