import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface Todo {
  id: number;
  description: string;
  date: string;
  is_done: boolean;
}

interface TodoListWidgetProps {
  userId: string | null;
}

export const TodoListWidget: React.FC<TodoListWidgetProps> = ({ userId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        `http://localhost:3000/api/todo?userId=${userId}`
      );
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, [userId]);

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          <ListItemText primary={todo.description} secondary={todo.date} />
        </ListItem>
      ))}
    </List>
  );
};
