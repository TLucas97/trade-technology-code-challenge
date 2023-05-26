import LoginCard from '../components/LoginCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const key: string | null = localStorage.getItem('apiKey');
    if (key) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <LoginCard />
    </div>
  );
};

export default Login;
