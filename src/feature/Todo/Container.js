import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

import { TodoForm, TodoList } from './component';
import useStateTodo from './hooks/useStateTodo';
import Loading from 'feature/Loading';

import { loadingReducer } from '../Loading/redux/reducer';
import { fetchTodo, todoSuccess } from './redux/action';

const Todo = ({ fetchTodo, todoSuccess, data }) => {
  const { todos, initTodo, addTodo, deleteTodo, completedTodo } = useStateTodo([]);
  const [ { loading }, dispatch ] = useReducer(loadingReducer, { loading: false });

  const callbackApi = () => axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');

  const fetchData = async () => {
    const dataFromFetch = await fetchTodo(() => callbackApi());
    todoSuccess(dataFromFetch);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    initTodo(data);
  }, [data]);

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

const mapStateToProps = ({
  todo: { data },
}) => ({
  data,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchTodo,
    todoSuccess,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Todo);