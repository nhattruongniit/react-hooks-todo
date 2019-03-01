import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

import { TodoForm, TodoList } from './component';
import useStateTodo from './hooks/useStateTodo';
import Loading from 'feature/Loading';

import { loadingReducer } from '../Loading/redux/reducer';

export const Todo = () => {
  const { todos, initTodo, addTodo, deleteTodo, completedTodo } = useStateTodo([]);
  const [ { loading }, dispatch ] = useReducer(loadingReducer, { loading: false });

  const fetchData = async () => {
    const result = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=30');
    initTodo(result.data);
    dispatch({ type: 'HIDDEN_LOADING' });
  };

  useEffect(() => {
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

  // Infinity scroll
  const [ isFetching, setIsFetching ] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>  window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreItems();
  }, [isFetching]);

  const fetchMoreItems = () => {
    setTimeout(async () => {
      const data = {
        title: `moreItem`,
        completed: false,
      }
      addTodo(data);
      setIsFetching(false);
    }, 2000)
  }
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  }

  return (
    <>
      <Typography component="h1" variant="h2">
        Todos List Hooks
      </Typography>
      { loading && <Loading />}
      <>
        <TodoForm addTodo={handleAddTodo} />
        <TodoList 
          todos={todos} 
          deleteTodo={handleDeleteTodo} 
          completeTodo={handleCompleteTodo} 
        />
        {isFetching && 'Fetching more list items...'}
      </>
    </>
  )
}