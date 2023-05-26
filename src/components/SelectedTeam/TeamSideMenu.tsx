import Button from '../UI/Button';
import { GiHighGrass } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { useState } from 'react';
import Tooltip from '../UI/Tooltip';
import Modal from '../UI/Modal';

interface TeamSideMenuProps {
  setCurrentMenuItem: (menuItem: string) => void;
  currentMenuItem: string;
  teamInfo: any;
}

const TeamSideMenu = ({
  setCurrentMenuItem,
  currentMenuItem,
  teamInfo,
}: TeamSideMenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className='w-full h-full flex items-center justify-between flex-col font-bold text-gray-700 max-medium:gap-y-8 max-small3:max-w-[750px]'>
        <div className='px-2 py-2 mt-4 flex items-center justify-center flex-col gap-y-2 max-medium:flex-row max-medium:gap-y-0 max-medium:gap-x-6 text-center max-small1:flex-col'>
          <img
            src={teamInfo?.response[0]?.team?.logo || ''}
            alt='team-logo'
            className='w-[70px]'
          />
          <p>
            {teamInfo?.response[0]?.team?.name || 'N/A'} |{' '}
            {teamInfo?.response[0]?.team?.code || 'N/A'}
          </p>
          <p>
            {teamInfo?.response[0]?.team?.country || 'N/A'} |{' '}
            {teamInfo?.response[0]?.team?.founded || 'N/A'}
          </p>
          <img
            src={teamInfo?.response[0]?.venue?.image || ''}
            alt='venue-photo'
            className='w-[70px] mt-2 max-small3:hidden'
          />
          <p className='max-small3:hidden'>
            {teamInfo?.response[0]?.venue?.name || 'N/A'} |{' '}
            {teamInfo?.response[0]?.venue?.city || 'N/A'}
          </p>
          <p className='max-small3:hidden'>
            {teamInfo?.response[0]?.venue?.address || 'N/A'}
          </p>
          <Tooltip text='type of surface'>
            <div className='flex items-center gap-x-2 max-small3:hidden'>
              <GiHighGrass className='text-xl text-green-600' />
              <p>{teamInfo?.response[0]?.venue?.surface || 'N/A'}</p>
            </div>
          </Tooltip>
          <Tooltip text="venue people's capacity">
            <div className='flex items-center gap-x-2 max-small3:hidden'>
              <IoIosPeople className='text-xl text-blue-600' />
              <p>{teamInfo?.response[0]?.venue?.capacity || 'N/A'}</p>
            </div>
          </Tooltip>
        </div>
        <div className='w-full h-[45%] pb-5 flex items-center justify-between flex-col max-medium:flex-row max-medium:px-4'>
          <div className='flex flex-col gap-y-4 max-medium:flex-row max-medium:gap-y-0 max-medium:gap-x-6 max-small3:hidden'>
            <Button
              freeSize
              focused={currentMenuItem === 'results'}
              onClick={() => setCurrentMenuItem('results')}
            >
              Team results
            </Button>
            <Button
              freeSize
              focused={currentMenuItem === 'players'}
              onClick={() => setCurrentMenuItem('players')}
            >
              Players List
            </Button>
            <Button
              freeSize
              focused={currentMenuItem === 'formations'}
              onClick={() => setCurrentMenuItem('formations')}
            >
              Most used formations
            </Button>
            <Button
              freeSize
              focused={currentMenuItem === 'goals'}
              onClick={() => setCurrentMenuItem('goals')}
            >
              Goal stats
            </Button>
          </div>
          <div className='small3:hidden'>
            <Button onClick={() => setIsModalOpen(true)}>Menu</Button>
          </div>
          <Button theme='danger' onClick={() => setCurrentMenuItem('exit')}>
            Exit
          </Button>
        </div>
      </div>
      <Modal isActive={isModalOpen} setIsActive={setIsModalOpen}>
        <div className='py-5 px-1 flex flex-col gap-y-6'>
          <Button
            freeSize
            focused={currentMenuItem === 'results'}
            onClick={() => {
              setCurrentMenuItem('results');
              setIsModalOpen(false);
            }}
          >
            Team results
          </Button>
          <Button
            freeSize
            focused={currentMenuItem === 'players'}
            onClick={() => {
              setCurrentMenuItem('players');
              setIsModalOpen(false);
            }}
          >
            Players List
          </Button>
          <Button
            freeSize
            focused={currentMenuItem === 'formations'}
            onClick={() => {
              setCurrentMenuItem('formations');
              setIsModalOpen(false);
            }}
          >
            Most used formations
          </Button>
          <Button
            freeSize
            focused={currentMenuItem === 'goals'}
            onClick={() => {
              setCurrentMenuItem('goals');
              setIsModalOpen(false);
            }}
          >
            Goal stats
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TeamSideMenu;
