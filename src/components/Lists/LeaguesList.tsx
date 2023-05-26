import { ContextData } from '../../ContextWrapper';
import { fetchLeagues } from '../../service/requests';
import { useContext, useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Loader from '../Loader';
import toast from 'react-hot-toast';

const LeaguesList = () => {
  const { country, season, league, setLeague } = useContext(ContextData);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [leagueName, setLeagueName] = useState<string>('');
  const [isLoadingLeagues, setIsLoadingLeagues] = useState<boolean>(false);

  const handleLeagueRemoval = (currentLeague: number) => {
    if (league === currentLeague) {
      setLeague(0);
    }
  };

  useEffect(() => {
    const key: string | null = localStorage.getItem('apiKey');
    if (key) {
      const fetchLeaguesList = async () => {
        try {
          setIsLoadingLeagues(true);
          const response = await fetchLeagues(key, country, season);

          if (!response) {
            setIsLoadingLeagues(false);
            return;
          }

          setLeagues(response);
          setIsLoadingLeagues(false);
        } catch (error) {
          console.log(error);
          setIsLoadingLeagues(false);
          toast.error('Something went wrong! Please try again later.');
        }
      };

      fetchLeaguesList();
    }
  }, [country, season, setLeagues]);

  return (
    <div className='w-full h-full flex justify-center animate-fadeIn'>
      {isLoadingLeagues ? (
        <div className='w-full h-[250px] flex justify-center animate-fadeIn mt-[10em]'>
          <Loader />
        </div>
      ) : (
        <div className='w-full flex flex-col items-center mt-4 px-3'>
          <h1 className='text-2xl font-bold'>Select a league</h1>
          <div className='w-full h-[45px] flex justify-end items-end mt-2'>
            {league !== 0 && (
              <div className='animate-fadeIn flex gap-x-2 items-center  py-1 px-3 bg-orange-200'>
                <span>
                  Selected league: <strong>{leagueName}</strong>
                </span>
                <button
                  onClick={() => {
                    setLeague(0);
                    setLeagueName('');
                  }}
                >
                  <IoClose className='text-xl' />
                </button>
              </div>
            )}
          </div>
          <div className='w-full h-full flex flex-col border-[1px] mt-3 overflow-scroll overflow-x-hidden'>
            {leagues.map((data: any, i) => (
              <div
                key={i}
                className={`w-full flex items-center justify-between px-2 py-3 border-b-[1px] border-t-[1px] cursor-pointer hover:bg-gray-200 ${
                  league === data.league.id && 'bg-gray-200'
                }`}
                onClick={() => {
                  setLeague(data.league.id);
                  setLeagueName(data.league.name);
                  handleLeagueRemoval(data.league.id);
                }}
              >
                <div className='flex items-center gap-x-2'>
                  <img
                    src={data.league.logo}
                    alt='league logo'
                    className='w-8 h-8'
                  />
                  <p className='text-lg'>{data.league.name}</p>
                </div>
                <h2 className='text-gray-600'>Select league</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaguesList;
