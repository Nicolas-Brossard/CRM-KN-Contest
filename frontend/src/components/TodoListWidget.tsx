import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Checkbox,
  Fab,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { AddTodoModal } from './AddTodoModal';
import jwt_decode from 'jwt-decode';

interface Todo {
  id: number;
  description: string;
  date: string;
  is_done: boolean;
}

export const TodoListWidget: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hoveredTodoId, setHoveredTodoId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await fetch(`http://localhost:3000/api/todo/${todoId}`, {
        method: 'DELETE',
      });
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todoId));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    const updatedTodo = { ...todo, is_done: event.target.checked };
    try {
      await fetch(`http://localhost:3000/api/todo/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    let userId: string | null = null;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.id;
    }
    const fetchTodos = async () => {
      const response = await fetch(
        `http://localhost:3000/api/todo?userId=${userId}`
      );
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#2f3c4c',
        borderRadius: 5,
        width: '15%',
        height: '100%',
      }}
    >
      <div>
        <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
          Todo Liste
        </Typography>
      </div>
      <List sx={{ backgroundColor: '#fff', height: '100%' }}>
        {todos.length === 0 ? (
          <Typography align="center" sx={{ color: '#2f3c4c', padding: '20px' }}>
            Créez votre première todo
          </Typography>
        ) : (
          todos.map((todo) => (
            <ListItem
              key={todo.id}
              onMouseEnter={() => setHoveredTodoId(todo.id)}
              onMouseLeave={() => setHoveredTodoId(null)}
            >
              <Checkbox
                checked={todo.is_done}
                onChange={(event) => handleCheckboxChange(event, todo)}
                sx={{
                  color: '#303c4c',
                  '&.Mui-checked': {
                    color: '#303c4c',
                  },
                  '&.Mui-checked:hover': {
                    backgroundColor: '#303c4ce',
                  },
                  '&.Mui-checked:focus': {
                    backgroundColor: '#303c4ce',
                  },
                }}
              />
              <ListItemText
                primary={todo.description}
                sx={{
                  fontSize: '0.8em',
                  color: '#2f3c4c',
                  textDecoration: todo.is_done ? 'line-through' : 'none',
                }}
              />
              {hoveredTodoId === todo.id && (
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => handleDeleteTodo(todo.id)}
                  sx={{
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px',
                    '&:hover': {
                      outline: 'none',
                    },
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                >
                  <CloseIcon style={{ width: '80%' }} />
                </IconButton>
              )}
            </ListItem>
          ))
        )}

        <div
          style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'flex-end',
            marginRight: 5,
            marginBottom: 5,
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              width: '20px',
              height: '20px',
              minWidth: '20px',
              minHeight: '20px',
              backgroundColor: '#303c4c',
              '&:hover': {
                backgroundColor: '#303c4c',
                outline: 'none',
              },
              '&:focus': {
                backgroundColor: '#303c4c',
                outline: 'none',
              },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <AddIcon style={{ width: '80%' }} />
          </Fab>
        </div>
      </List>
      <AddTodoModal
        open={isModalOpen}
        handleClose={handleModalClose}
        addTodo={handleAddTodo}
      />
    </div>
  );
};
