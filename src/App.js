import React from 'react';
import './App.css';

import Typography from '@material-ui/core/Typography';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useTodoState from './useTodoState';

const App = () => {
  const  {todos, addTodo, deleteTodo} = useTodoState([]);
  
  const handleSaveTodo = (e) => {
    const textTrim = e.trim();
    if(textTrim.length) {
      addTodo(textTrim);
    }
  }

  return (
    <div className="App">
      <Typography component="h1" variant="h2">
        Todos List Hooks
      </Typography>
      <TodoForm saveTodo={handleSaveTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
