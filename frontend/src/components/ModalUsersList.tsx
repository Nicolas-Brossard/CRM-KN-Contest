import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

import { UserForm } from './UserForm';
import { useSnackbar } from 'notistack';
import './ModalList.css';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}
interface ModalListProps {
  data: User[];
  type: string;
  refresh: () => void;
}

const ModalUsersList: React.FC<ModalListProps> = ({ data, type, refresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleAddButtonClick = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
    refresh();
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        refresh();
        enqueueSnackbar('Contact supprimé avec succès', { variant: 'success' });
      } else {
        enqueueSnackbar(
          "Une erreur s'est produite lors de la suppression du contact",
          { variant: 'error' }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        "Une erreur s'est produite lors de la suppression du contact",
        { variant: 'error' }
      );
    }
  };

  const handleUpdate = (id: number) => {
    const contactToEdit = data.find((contact) => contact.id === id);
    if (contactToEdit) {
      setSelectedUser(contactToEdit);
      setShowForm(true);
    }
  };

  return (
    <Card
      style={{
        maxWidth: '80%',
        minWidth: '70%',
        margin: '5%',
        padding: 5,
      }}
    >
      <CardContent
        className="custom-scrollbar"
        style={{
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        {showForm && (
          <UserForm
            closeForm={handleCloseForm}
            user={selectedUser}
            isEditMode={!!selectedUser}
          />
        )}
        {data.length === 0 ? (
          <Typography variant="h6" align="center">
            Aucune donnée disponible
          </Typography>
        ) : (
          <List>
            {data.map((user) => (
              <ListItem key={user.id} sx={{ display: 'flex' }}>
                <ListItemText
                  primary={`${user.username}`}
                  sx={{ marginBottom: '50px' }}
                  secondary={
                    <Box>
                      {user.email && (
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <EmailIcon fontSize="small" />
                          <Typography variant="body2" ml={1}>
                            {user.email}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ height: '80%' }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUpdate(user.id)}
                      sx={{
                        '&:focus': {
                          outline: 'transparent',
                          backgroundColor: 'transparent',
                        },
                      }}
                      style={{ margin: '5px' }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        margin: '5px',
                        color: 'red',
                        borderColor: 'red',
                      }}
                      onClick={() => handleDelete(user.id)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        },
                        '&:active': {
                          backgroundColor: 'rgba(255, 0, 0, 0.2)',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      Supprimer
                    </Button>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
      <CardActions>
        <Button
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#EDC88C',
            color: 'white',
            border: '1px solid #EDC88C',
            boxShadow: '0px 0px 0px 0px #EDC88C, 0px 0px 0px 0px #EDC88C',
          }}
          sx={{
            '&:focus': {
              outline: 'transparent',
              backgroundColor: 'transparent',
            },
          }}
          color="inherit"
          onClick={handleAddButtonClick}
        >
          Ajouter
        </Button>
      </CardActions>
    </Card>
  );
};

export { ModalUsersList };
