import React, { useEffect, useState } from 'react';
import { LoginModal } from '@/components';
import { useNavigate } from 'react-router-dom';

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();

  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    console.log(email, password);
    navigate('/dashboard');
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
