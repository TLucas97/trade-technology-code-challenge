import { FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import { ContextData } from '../ContextWrapper';
import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import CountriesList from '../components/Lists/CountriesList';
import LeaguesList from '../components/Lists/LeaguesList';
import TeamsList from '../components/Lists/TeamsList';
import SeasonsList from '../components/Lists/SeasonsList';
import toast from 'react-hot-toast';

const Home = () => {
  const [step, setStep] = useState<number>(1);
  const { country, season, league, team } = useContext(ContextData);
  const navigate = useNavigate();

  const incrementStep = () => {
    if (step === 1 && !country) {
      toast.error('Please select a country to continue');
      return;
    }

    if (step === 2 && !season) {
      toast.error('Please select a season to continue');
      return;
    }

    if (step === 3 && !league) {
      toast.error('Please select a league to continue');
      return;
    }

    setStep(step + 1);
  };

  const selectTeam = () => {
    if (!team) {
      toast.error('Please select a team to continue');
    }

    navigate('/team');
  };

  const StepsContent = useCallback(() => {
    switch (step) {
      case 1:
        return <CountriesList />;
      case 2:
        return <SeasonsList />;
      case 3:
        return <LeaguesList />;
      case 4:
        return <TeamsList />;
      default:
        return null;
    }
  }, [step]);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-full flex items-center justify-center flex-col'>
        <div className='flex items-center justify-between w-[650px] max-small2:w-[90%] max-small2:flex-wrap max-small2:gap-y-4 max-small2:gap-x-4'>
          <button className='h-[40px] px-3 bg-white shadow-xl rounded-sm'>
            Country
          </button>
          <FaArrowRight className='text-2xl' />
          <button
            className={`h-[40px] px-3 bg-white shadow-xl rounded-sm ${
              step < 2 && !season && 'opacity-30 pointer-events-none'
            }`}
          >
            Season
          </button>
          <FaArrowRight className='text-2xl' />
          <button
            className={`h-[40px] px-3 bg-white shadow-xl rounded-sm ${
              step < 3 && !league && 'opacity-30 pointer-events-none'
            }`}
          >
            League
          </button>
          <FaArrowRight className='text-2xl' />
          <button
            className={`h-[40px] px-3 bg-white shadow-xl rounded-sm ${
              step < 4 && !team && 'opacity-30 pointer-events-none'
            }`}
          >
            Team
          </button>
        </div>
        <div className='w-[650px] max-small2:w-[90%] h-[400px] bg-white mt-5 shadow-xl rounded-sm flex flex-col'>
          <div className='w-full h-[85%]'>
            <StepsContent />
          </div>
          <div className='w-full h-[15%] flex items-center justify-center gap-x-3'>
            <Button
              theme='secondary'
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
            >
              Prev
            </Button>
            {step < 4 ? (
              <Button onClick={incrementStep}>Next</Button>
            ) : (
              <Button freeSize onClick={selectTeam}>
                Check team info
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
