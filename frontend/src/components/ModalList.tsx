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
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import { ContactForm } from './ContactForm';
import { useSnackbar } from 'notistack';

interface Contact {
  id: number;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  location: string | null;
  status: string;
}
interface ModalListProps {
  data: Contact[];
  type: string;
  refresh: () => void;
}

const ModalList: React.FC<ModalListProps> = ({ data, type, refresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleAddButtonClick = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedContact(null);
    refresh();
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/contact/${id}`, {
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
      setSelectedContact(contactToEdit);
      setShowForm(true);
    }
  };

  return (
    <Card
      style={{
        maxWidth: '80%',
        minWidth: '30%',
        margin: 'auto',
      }}
    >
      <CardContent>
        {showForm && (
          <ContactForm
            type={type}
            closeForm={handleCloseForm}
            contact={selectedContact}
            isEditMode={!!selectedContact}
          />
        )}
        {data.length === 0 ? (
          <Typography variant="h6" align="center">
            Aucune donnée disponible
          </Typography>
        ) : (
          <List>
            {data.map((contact) => (
              <ListItem key={contact.id}>
                <ListItemText
                  primary={`${contact.first_name} ${contact.last_name}`}
                  secondary={
                    <Box>
                      {contact.email && (
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <EmailIcon fontSize="small" />
                          <Typography variant="body2" ml={1}>
                            {contact.email}
                          </Typography>
                        </Box>
                      )}
                      {contact.phone && (
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <PhoneIcon fontSize="small" />
                          <Typography variant="body2" ml={1}>
                            {contact.phone}
                          </Typography>
                        </Box>
                      )}
                      {contact.company && (
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <BusinessIcon fontSize="small" />
                          <Typography variant="body2" ml={1}>
                            {contact.company}
                          </Typography>
                        </Box>
                      )}
                      {contact.location && (
                        <Box display="flex" alignItems="center">
                          <LocationOnIcon fontSize="small" />
                          <Typography variant="body2" ml={1}>
                            {contact.location}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box display="flex" flexDirection="column">
                    <Button
                      variant="outlined"
                      style={{
                        margin: '5px',
                        color: '#12750bee',
                        borderColor: '#12750bee',
                      }}
                      onClick={() => handleDelete(contact.id)}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#12750bee',
                          color: 'white',
                        },
                        '&:active': {
                          backgroundColor: '#12750bee',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      Actions
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUpdate(contact.id)}
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
                      onClick={() => handleDelete(contact.id)}
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
          color="inherit"
          onClick={handleAddButtonClick}
        >
          Ajouter
        </Button>
      </CardActions>
    </Card>
  );
};

export { ModalList };
