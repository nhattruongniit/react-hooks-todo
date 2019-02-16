import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Typography from '@material-ui/core/Typography';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

const App = () => {
  const [ todos, setTodos ] = useState([]);
  const fetchData = async () => {
    const result = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    setTodos(result.data)
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false,
    }).then(res => setTodos([...todos, res.data]));
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((_, index) => index !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <Typography component="h1" variant="h2">
        Todos List Hooks
      </Typography>
      <TodoForm addTodo={handleAddTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
