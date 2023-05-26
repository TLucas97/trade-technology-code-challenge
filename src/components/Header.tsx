import { BiFootball } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ContextData } from '../ContextWrapper';
import Modal from './UI/Modal';
import UserSettings from './UserSettings';

const Header = () => {
  const [settingsView, setSettingsView] = useState<boolean>(false);
  const { apiKey, setApiKey } = useContext(ContextData);

  useEffect(() => {
    const key: string | null = localStorage.getItem('apiKey');
    if (key) setApiKey(key);
  }, [setApiKey]);

  return (
    <>
      <header className='w-full h-[70px] flex justify-between items-center px-[5em] max-small:px-[1em] shadow-2xl bg-white'>
        <div className='flex items-center gap-x-2'>
          <BiFootball className='text-4xl' />
          <h1 className='text-xl font-bold tracking-wider'>Football-Info</h1>
        </div>
        <button
          className={`hover:scale-[1.15] transition ease-in-out ${
            !apiKey && 'opacity-20 pointer-events-none'
          }`}
          onClick={() => setSettingsView(true)}
        >
          <AiFillSetting className='text-3xl' />
        </button>
      </header>
      <Modal isActive={settingsView} setIsActive={setSettingsView}>
        <UserSettings onLogout={() => setSettingsView(false)} />
      </Modal>
    </>
  );
};

export default Header;
