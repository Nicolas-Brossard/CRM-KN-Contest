import React, { useEffect, useState } from 'react';
import { LoginModal } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      enqueueSnackbar('Connexion réussie', { variant: 'success' });
      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } else {
      enqueueSnackbar('Email ou mot de passe incorrect', { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(true)}
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        email={email}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export { LoginContainer };
