import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';

import HooksTodo from './Hooks/hooksTodo';

import {
  TodoForm,
  TodoList,
} from '../Todo';
import LoadingReducer from '../Loading/Redux/reducer';
import { CircularIndeterminate } from 'feature';

const App = () => {
  const { todos, initTodo, addTodo, deleteTodo, completedTodo } = HooksTodo([]);
  const [ isError, setIsError ] = useState(false);
  const [ { loading }, dispatch ] = useReducer(LoadingReducer, { loading: false });
  
  const fetchData = async () => {
    try{
      const result = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
      initTodo(result.data);
    } catch(err) {
      setIsError(true);
    };
    dispatch({ type: 'HIDDEN_LOADING' });
  };

  useEffect(() => {
    dispatch({ type: 'SHOW_LOADING' });
    fetchData();
  }, []);

  const handleAddTodo = async (title) => {
    dispatch({ type: 'SHOW_LOADING' });
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false,
    });
    addTodo(data);
    dispatch({ type: 'HIDDEN_LOADING' });
  };

  const handleDeleteTodo = id => deleteTodo(id);

  const handleCompleteTodo = id => completedTodo(id);

  return (
    <div className="App">
      <Typography component="h1" variant="h2">
        Todos List Hooks
      </Typography>
      { loading && <CircularIndeterminate />}
      <div>
        <TodoForm addTodo={handleAddTodo} />
        <TodoList 
          todos={todos} 
          deleteTodo={handleDeleteTodo} 
          completeTodo={handleCompleteTodo} 
        />
      </div>
      { isError && <div>Something went wrong ....</div>}
    </div>
  );
}

export default App;
