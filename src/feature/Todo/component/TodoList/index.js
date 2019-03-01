import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

export const TodoList = ({ todos, deleteTodo, completeTodo }) => (
  <List>
    {todos.map((todo, index) => (
      <ListItem key={index.toString()} dense button>
        <ListItemText primary={todo.title} style={{ textDecoration: todo.completed ? 'line-through': '' }} />
        <div className="buttonMaterial">
          <Button 
            variant="contained" 
            color="primary"
            className={`btn-${todo.completed ? 'completed' : 'complete'}`}
            onClick={() => {
              completeTodo(index)
            }} 
          > 
            {todo.completed ? 'Completed' : 'Complete'} 
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => {
                deleteTodo(index)
            }} 
          > 
            Delete 
          </Button>
        </div>
      </ListItem>
    ))}
  </List>
);