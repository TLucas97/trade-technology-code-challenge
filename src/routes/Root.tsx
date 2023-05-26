import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from '../components/Content';
import { Toaster } from 'react-hot-toast';
import { ContextWrapper } from '../ContextWrapper';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const key: string | null = localStorage.getItem('apiKey');
    if (!key) navigate('/');
  }, [navigate]);

  return (
    <ContextWrapper>
      <Toaster />
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </ContextWrapper>
  );
};

export default Root;
