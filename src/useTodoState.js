import { useState } from 'react';

export default initialValue => {
  const [todos, setTodos] = useState(initialValue);

  return {
    todos,
    addTodo: todoText => {
      setTodos([...todos, todoText]);
    },
    deleteTodo: id => {
      const newTodos = todos.filter((_, index) => index !== id);
      setTodos(newTodos);
    },
  }
};