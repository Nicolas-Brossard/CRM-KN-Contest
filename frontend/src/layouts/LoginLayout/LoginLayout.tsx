import { LoginContainer } from '@/containers';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginLayout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, []);
  return <LoginContainer />;
};

export { LoginLayout };
