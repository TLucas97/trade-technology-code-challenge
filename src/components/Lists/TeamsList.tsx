import { ContextData } from '../../ContextWrapper';
import { fetchTeams } from '../../service/requests';
import { useContext, useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Loader from '../Loader';
import toast from 'react-hot-toast';

const TeamsList = () => {
  const { country, season, league, setTeam } = useContext(ContextData);
  const [teams, setTeams] = useState<any[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  const [isLoadingTeams, setIsLoadingTeams] = useState<boolean>(false);

  const handleTeamRemoval = (currentTeam: number) => {
    if (league === currentTeam) {
      setTeam(0);
    }
  };

  useEffect(() => {
    const key: string | null = localStorage.getItem('apiKey');
    if (key) {
      const fetchTeamsList = async () => {
        try {
          setIsLoadingTeams(true);
          const response = await fetchTeams(key, country, season, league);

          if (!response) {
            setIsLoadingTeams(false);
            return;
          }

          setTeams(response);
          setIsLoadingTeams(false);
        } catch (error) {
          console.log(error);
          setIsLoadingTeams(false);
          toast.error('Something went wrong! Please try again later.');
        }
      };

      fetchTeamsList();
    }
  }, [country, league, season]);

  return (
    <div className='w-full h-full flex justify-center animate-fadeIn'>
      {isLoadingTeams ? (
        <div className='w-full h-[250px] flex justify-center animate-fadeIn mt-[10em]'>
          <Loader />
        </div>
      ) : (
        <div className='w-full flex flex-col items-center mt-4 px-3'>
          <h1 className='text-2xl font-bold'>Select a team</h1>
          <div className='w-full h-[45px] flex justify-end items-end mt-2'>
            {league !== 0 && (
              <div className='animate-fadeIn flex gap-x-2 items-center  py-1 px-3 bg-orange-200'>
                <span>
                  Selected team: <strong>{teamName}</strong>
                </span>
                <button
                  onClick={() => {
                    setTeam(0);
                    setTeamName('');
                  }}
                >
                  <IoClose className='text-xl' />
                </button>
              </div>
            )}
          </div>
          <div className='w-full h-full flex flex-col border-[1px] mt-3 overflow-scroll overflow-x-hidden'>
            {teams.map((data: any, i) => (
              <div
                key={i}
                className={`w-full flex items-center justify-between px-2 py-3 border-b-[1px] border-t-[1px] cursor-pointer hover:bg-gray-200 ${
                  league === data.team.id && 'bg-gray-200'
                }`}
                onClick={() => {
                  setTeam(data.team.id);
                  setTeamName(data.team.name);
                  handleTeamRemoval(data.team.id);
                }}
              >
                <div className='flex items-center gap-x-2'>
                  <img
                    src={data.team.logo}
                    alt='league logo'
                    className='w-8 h-8'
                  />
                  <p className='text-lg'>{data.team.name}</p>
                </div>
                <h2 className='text-gray-600'>Select team</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsList;
