import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextData } from '../ContextWrapper';
import { fetchCountries } from '../service/requests';
import Input from './UI/Input';
import Button from './UI/Button';
import toast from 'react-hot-toast';
import Tooltip from './UI/Tooltip';

interface UserSettingsProps {
  onLogout: () => void;
}

const UserSettings = ({ onLogout }: UserSettingsProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const { setApiKey: setApiKeyContext, apiKey: apiKeyContext } =
    useContext(ContextData);
  const [disabledCounter, setDisabledCounter] = useState<number>(3);
  const [isTryingToLogout, setIsTryingToLogout] = useState<boolean>(false);
  const [hasBeenWarned, setHasBeenWarned] = useState<boolean>(false);
  const [isUpdatingApiKey, setIsUpdatingApiKey] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
  };

  const saveKeyFromLocalStorage = () => {
    const key: string | null = localStorage.getItem('apiKey');
    if (key) setApiKey(key);
    if (apiKeyContext) setApiKey(apiKeyContext);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    saveKeyFromLocalStorage();
  };

  const saveEditedKey = async () => {
    try {
      if (!apiKey) {
        toast.error('Please insert your API Key');
        return;
      }

      setIsUpdatingApiKey(true);

      const response = await fetchCountries(apiKey);

      if (!response) {
        setIsUpdatingApiKey(false);
        return;
      }

      setIsEditing(false);
      setApiKeyContext(apiKey);
      localStorage.setItem('apiKey', apiKey);
      setApiKey(apiKeyContext);
      saveKeyFromLocalStorage();
      toast.success('API Key saved!');
      setIsUpdatingApiKey(false);
    } catch (error) {
      toast.error('Something went wrong, please try again later');
      setIsUpdatingApiKey(false);
    }
  };

  const handleLogoutWarning = () => {
    if (hasBeenWarned) return;

    setIsTryingToLogout(true);

    const intervalId = setInterval(() => {
      setDisabledCounter((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          setIsTryingToLogout(false);
          setHasBeenWarned(true);
          return 3;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  };

  const logOut = () => {
    setIsEditing(false);
    setApiKeyContext('');
    localStorage.removeItem('apiKey');
    saveKeyFromLocalStorage();
    toast.success('Logged out!');
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const key: string | null = localStorage.getItem('apiKey');
    if (key) setApiKey(key);
    if (apiKeyContext) setApiKey(apiKeyContext);
  }, [apiKeyContext]);

  return (
    <div className='w-[300px] max-extraSmall:w-[99%] flex flex-col gap-y-4'>
      <h1 className='text-xl'>Settings</h1>
      <Input
        placeholder='API KEY'
        value={apiKey}
        onChange={handleApiKeyChange}
        disabled={!isEditing || isUpdatingApiKey}
      />
      <div className='flex items-center justify-start gap-x-3 mt-5'>
        {!isEditing ? (
          <>
            <Button freeSize onClick={() => setIsEditing(true)}>
              Edit API Key
            </Button>
            <Tooltip text='Are you sure about this? Your API KEY will be deleted'>
              <Button
                theme='danger'
                disabled={isTryingToLogout}
                onMouseEnter={handleLogoutWarning}
                onMouseLeave={() => setHasBeenWarned(false)}
                onClick={logOut}
              >
                {isTryingToLogout ? `Logout (${disabledCounter})` : 'Logout'}
              </Button>
            </Tooltip>
          </>
        ) : (
          <>
            <Button
              theme='success'
              loading={isUpdatingApiKey}
              onClick={saveEditedKey}
            >
              Save
            </Button>
            <Button
              theme='secondary'
              disabled={isUpdatingApiKey}
              onClick={cancelEditing}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
