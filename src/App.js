import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  constructor(props){
    super(props)
    this.state={todos:[], input:''}
    this.add=this.add.bind(this);
    this.sortList=this.sortList.bind(this);
    this.delete=this.delete.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  onChange(event) {
  // Set the state to the value of the input
  this.setState({
    input: event.target.value
  });
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

  add(event){
    event.preventDefault();
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
            self.setState({todos:[...self.state.todos,todo], input:''});
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

  sortList(){
      const self = this;
      var oldArray = self.state.todos;
      var newArray = oldArray.sort(function (a, b) {
      return a.text.localeCompare(b.text);
      });
      self.setState({todos:newArray});
  }

  delete(event){
  //  const self = this;
    const self=this;
    var itemId=event.target.parentNode.id;
    // event.persist();
    var xhttp4 = new XMLHttpRequest();
    // Response handler
    xhttp4.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState === 4 && this.status === 200) {
            // parse JSON response
            // remove actual items
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            // You need the id of the todo you want to delete as a variable.
            const remainingTodos = self.state.todos.filter((todo) => {
              // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
              if (todo.id !== itemId) {
                return todo;
              }

            });
            self.setState({todos:remainingTodos});
            // Update state with filtered list using this.setState();
        } else if (this.readyState === 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };
    xhttp4.open("DELETE", "https://cse204.work/todos/"+itemId, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
    xhttp4.send();
  }

  render() {
    return (
      <div className="App">
        <h1>Isabel's To Do App</h1>
        <div id="todo-list">
          <NewTodo add={this.add} sort={this.sortList} onChange={this.onChange} input={this.state.input}/>
          <button id="sort" type="button" name="sort" onClick={this.sortList}> Sort List By Alphabetical Order </button>
          {this.state.todos.map((todo)=>
          <Todo key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                created={todo.created}
                delete={this.delete} />)}
        </div>
      </div>

    );
  }
}

export default App;
