import React, { useState } from 'react';
import "./App.css"
function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    }

    setTodos([...todos, newTodo]);
     setInput("")
  }

  const toggleTodo = (id) => {

    setTodos(
      todos.map(todo => 
       todo.id === id ? {...todo,completed : !todo.completed} : todo
      )
    )
    }

  const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id != id))
}
    return (
        <div  style={{maxWidth :"400px",margin:"auto"}}>
        <h2>Todo List</h2>
        <input
          type="text"
          placeholder="Enter todo"
          value={input}
        onChange = {(e)=> setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{margin:"10px 0"}}>
              <input type="checkbox"
                checked={todo.completed}
              onChange ={()=> toggleTodo(todo.id)}
              />
              <span
              style={{textDecoration : todo.completed? "line-through" : "none" , marginLeft:"10px"}}
              >{todo.text}</span>
              <button
            style={{marginLeft:"10px"}}
                onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
        ))}
        </ul>
        </div>
    );
}

export default TodoList;