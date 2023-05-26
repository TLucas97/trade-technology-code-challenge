import Input from './UI/Input';
import Button from './UI/Button';
import { fetchCountries } from '../service/requests';
import { useContext } from 'react';
import { ContextData } from '../ContextWrapper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginCard = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const { setApiKey: setApiKeyContext, setCountries } = useContext(ContextData);

  const navigate = useNavigate();

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
  };

  const handleLogin = async () => {
    try {
      if (!apiKey) {
        toast.error('Please insert your API Key');
        return;
      }

      setIsLoggingIn(true);

      const response = await fetchCountries(apiKey);

      if (!response) {
        setIsLoggingIn(false);
        return;
      }

      setApiKeyContext(apiKey);
      localStorage.setItem('apiKey', apiKey);
      toast.success('Login success!');
      setIsLoggingIn(false);
      setCountries(response);
      navigate('/home');
    } catch (error) {
      toast.error('Something went wrong, please try again later');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className='w-[500px] h-[500px] max-small1:w-[95%] shadow-2xl flex flex-col rounded-sm bg-white'>
      <div className='w-full h-[220px] bg-[url("https://media0.giphy.com/media/3E3DqZvMgfslEQR0vr/giphy.gif")] bg-cover bg-no-repeat rounded-t-sm' />
      <div className='w-full flex flex-col items-center justify-center mt-7'>
        <h1 className='text-2xl font-bold'>Welcome to Football Info!</h1>
        <p className='text-sm text-gray-500'>Please login to continue</p>
        <div className='w-full flex flex-col items-center justify-center gap-y-4 mt-7 px-5'>
          <Input
            placeholder='Insert your API KEY here'
            value={apiKey}
            disabled={isLoggingIn}
            onChange={handleApiKeyChange}
          />
          <Button loading={isLoggingIn} onClick={handleLogin}>
            Login
          </Button>
          <span className='bg-orange-600 text-white py-1 px-4 rounded-lg text-xs'>
            Don't have an api key yet? get one at{' '}
            <a
              href='https://www.api-football.com/'
              target='_blank'
              className='underline'
            >
              https://www.api-football.com/
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
