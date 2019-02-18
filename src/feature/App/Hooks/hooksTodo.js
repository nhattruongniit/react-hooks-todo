import { useState } from 'react';

export default initialValue => {
  const [todos, setTodos] = useState(initialValue);

  return {
    todos,
    initTodo: todoList => {
      setTodos(todoList)
    },
    addTodo: todo => {
      setTodos([...todos, todo]);
    },
    deleteTodo: id => {
      const newTodos = todos.filter((_, index) => index !== id);
      setTodos(newTodos);
    },
    completedTodo: id => {
      const newTodos = [...todos];
      newTodos[id].completed = !newTodos[id].completed
      setTodos(newTodos);
    }
  }
};