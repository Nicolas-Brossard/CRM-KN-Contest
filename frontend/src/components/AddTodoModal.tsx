import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

interface Todo {
  id: number;
  description: string;
  date: string;
  is_done: boolean;
}
interface Contact {
  updatedAt: any;
  id: number;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  location: string | null;
  status: string;
  column: string;
  position: number;
}

interface AddTodoModalProps {
  open: boolean;
  handleClose: () => void;
  addTodo: (newTodo: Todo) => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  open,
  handleClose,
  addTodo,
}) => {
  const [description, setDescription] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );
  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('token');
      let userId: string | null = null;
      if (token) {
        const decodedToken: any = jwt_decode(token);
        userId = decodedToken.id;
      }
      const response = await fetch(
        `http://localhost:3000/api/contact?userId=${userId}`
      );
      const data = await response.json();
      setContacts(data);
    };

    if (open) {
      fetchContacts();
    }
  }, [open]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    let userId: string | null = null;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.id;
    }

    try {
      const response = await fetch('http://localhost:3000/api/todo/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          date: new Date(),
          is_done: false,
          user_id: userId,
          contact_id: selectedContactId,
        }),
      });
      const newTodo: Todo = await response.json();
      addTodo(newTodo);
      setDescription('');
      setSelectedContactId(null);
      handleClose();
    } catch (error) {
      console.error('Failed to create new todo:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter un nouveau rappel</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="contact-label">Contact</InputLabel>
          <Select
            labelId="contact-label"
            id="contact-select"
            value={selectedContactId || ''}
            label="Contact"
            onChange={(e) => setSelectedContactId(Number(e.target.value))}
          >
            {contacts.map((contact) => (
              <MenuItem
                key={contact.id}
                value={contact.id}
                sx={{ color: '#303c4c' }}
              >
                {contact.first_name} {contact.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSubmit} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
