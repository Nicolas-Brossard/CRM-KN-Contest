import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Dialog,
  Typography,
  Box,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Email from '@mui/icons-material/Email';
import VpnKey from '@mui/icons-material/VpnKey';
import CheckBox from '@mui/icons-material/CheckBox';
import { useSnackbar } from 'notistack';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}

interface UserFormProps {
  closeForm: () => void;
  user: User | null;
  isEditMode?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  closeForm,
  user,
  isEditMode = false,
}) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [isAdmin, setIsAdmin] = useState(user?.is_admin || false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      is_admin: isAdmin,
    };

    try {
      const endpoint = isEditMode
        ? `http://localhost:3000/api/users/${user?.id}`
        : 'http://localhost:3000/api/users/create';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setIsAdmin(false);
      closeForm();

      if (response.ok) {
        enqueueSnackbar(
          `L'utilisateur ${username} a bien été ${
            isEditMode ? 'modifié' : 'ajouté'
          }`,
          { variant: 'success' }
        );
      } else {
        enqueueSnackbar(
          `L'utilisateur ${username} n'a pas été ${
            isEditMode ? 'modifié' : 'ajouté'
          }, veuillez vérifier les informations renseignées`,
          { variant: 'error' }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        `L'utilisateur ${username} n'a pas été ${
          isEditMode ? 'modifié' : 'ajouté'
        } veuillez réessayer`,
        { variant: 'error' }
      );
    }
  };

  return (
    <Dialog
      open={true}
      onClose={closeForm}
      PaperProps={{
        style: {
          overflowX: 'hidden',
        },
      }}
    >
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
              {isEditMode ? 'Modifier utilisateur' : 'Ajouter utilisateur'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountCircle style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Email style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <VpnKey style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <CheckBox style={{ color: '#2f3c4d', marginRight: '5px' }} />
              <TextField
                label="Administrateur"
                value={isAdmin ? 'Oui' : 'Non'}
                onClick={() => setIsAdmin(!isAdmin)}
                InputProps={{
                  readOnly: true,
                }}
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

export { UserForm };
