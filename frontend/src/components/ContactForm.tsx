import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Dialog,
  Typography,
  Box,
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Business from '@mui/icons-material/Business';
import LocationOn from '@mui/icons-material/LocationOn';
import AssignmentInd from '@mui/icons-material/AssignmentInd';
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

interface ContactFormProps {
  type: string;
  closeForm: () => void;
  contact: Contact | null;
  isEditMode?: boolean;
}

const getLastContactPosition = async (userId: string, contactType: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/contact/last-position?user_id=${userId}&type=${contactType}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.position;
    }
  } catch (error) {
    console.error('Error while fetching the last contact position:', error);
  }
  return 0;
};

const ContactForm: React.FC<ContactFormProps> = ({
  type,
  closeForm,
  contact,
  isEditMode = false,
}) => {
  const [firstName, setFirstName] = useState(contact?.first_name || '');
  const [lastName, setLastName] = useState(contact?.last_name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [company, setCompany] = useState(contact?.company || '');
  const [location, setLocation] = useState(contact?.location || '');
  const [status, setStatus] = useState(contact?.status || '');

  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem('token');
  let userId: string | null = null;
  if (token) {
    const decodedToken: any = jwt_decode(token);
    userId = decodedToken.id;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      enqueueSnackbar("L'utilisateur n'est pas connecté.", {
        variant: 'error',
      });
      return;
    }

    const lastPosition = await getLastContactPosition(userId, type);
    const newPosition = lastPosition + 1;

    const contactData = {
      user_id: userId,
      type,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      location,
      status,
      position: newPosition,
    };

    try {
      const endpoint = isEditMode
        ? `http://localhost:3000/api/contact/${contact?.id}`
        : 'http://localhost:3000/api/contact/create';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setLocation('');
      setStatus('');
      closeForm();
      if (response.ok) {
        enqueueSnackbar(
          `Le contact ${firstName} ${lastName} a bien été ${
            isEditMode ? 'modifié' : 'ajouté'
          }`,
          { variant: 'success' }
        );
      } else {
        enqueueSnackbar(
          `Le contact ${firstName} ${lastName} n'a pas été ${
            isEditMode ? 'modifié' : 'ajouté'
          }, veuillez vérifier les informations renseignées`,
          { variant: 'error' }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        `Le contact ${firstName} ${lastName} n'a pas été ${
          isEditMode ? 'modifié' : 'ajouté'
        } veuillez réessayer`,
        { variant: 'error' }
      );
    }
  };

  return (
    <Dialog open={true} onClose={closeForm}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ padding: '1%', margin: '15px' }}>
          <Grid
            item
            xs={12}
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <Typography variant="h6">
              {isEditMode ? `Modifier ${type}` : `Ajouter ${type}`}
            </Typography>{' '}
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <AccountCircle style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              {' '}
              <AccountCircle style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              {' '}
              <Email style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <Phone style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <Business style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Société"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <LocationOn style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Localisation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <AssignmentInd style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Statut"
                value={type}
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <Button
              type="submit"
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
              variant="outlined"
            >
              {isEditMode ? 'Modifier' : 'Ajouter'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export { ContactForm };
