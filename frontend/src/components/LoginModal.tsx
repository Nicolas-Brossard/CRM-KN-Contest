import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { LogoKN } from './LogoKN';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LogoKN width={'64px'} color="#2F3C4D" />
        Connexion CRM-NK
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Mot de passe"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={handleSubmit}
        >
          Se connecter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LoginModal };
