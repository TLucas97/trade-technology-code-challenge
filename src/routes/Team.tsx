import { fetchSelectedTeamDetails } from '../service/requests';
import { useCallback, useState, useEffect, useContext } from 'react';
import { ContextData } from '../ContextWrapper';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import TeamPlayersList from '../components/SelectedTeam/TeamPlayersList';
import TeamSideMenu from '../components/SelectedTeam/TeamSideMenu';
import TeamFormations from '../components/SelectedTeam/TeamFormations';
import TeamGoalsByGame from '../components/SelectedTeam/TeamGoalsByGame';
import TeamResults from '../components/SelectedTeam/TeamResults';
import Loader from '../components/Loader';

const Team = () => {
  const {
    team,
    league,
    season,
    apiKey,
    setTeam,
    setCountry,
    setSeason,
    setLeague,
  } = useContext(ContextData);
  const [currentMenuItem, setCurrentMenuItem] = useState('results');
  const [teamInfo, setTeamInfo] = useState<any>(null);
  const [teamStatisticsData, setTeamStatisticsData] = useState<any>(null);
  const [playersListData, setPlayersListData] = useState<any>(null);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const key: string | null = localStorage.getItem('apiKey');

    if (!league || !season || !team) {
      navigate('/home');
    }

    setIsFetchingData(true);

    setTimeout(() => {
      if (key) {
        const fetchTeamDetails = async () => {
          try {
            const result: any = await fetchSelectedTeamDetails(
              apiKey || key,
              season,
              league,
              team,
            );
            console.log('🚀 ~ fetchTeamDetails ~ result:', result);

            setTeamInfo(result.info);
            setTeamStatisticsData(result.statistics);
            setPlayersListData(result.players);
            setIsFetchingData(false);
          } catch (error) {
            console.log(error);
            toast.error('Something went wrong! Please try again later.');
            setIsFetchingData(false);
          }
        };

        fetchTeamDetails();
      }
    }, 8000);
  }, [apiKey, league, navigate, season, team]);

  const handleMenuChange = (menuItem: string) => {
    setCurrentMenuItem(menuItem);
  };

  const SideMenuItems = useCallback(() => {
    switch (currentMenuItem) {
      case 'players':
        return (
          <div className='animate-fadeIn'>
            <TeamPlayersList
              playersListData={playersListData}
              teamStatisticsData={teamStatisticsData}
            />
          </div>
        );
      case 'formations':
        return (
          <div className='animate-fadeIn'>
            <TeamFormations teamStatisticsData={teamStatisticsData} />
          </div>
        );
      case 'results':
        return (
          <div className='animate-fadeIn'>
            <TeamResults teamStatisticsData={teamStatisticsData} />
          </div>
        );
      case 'goals':
        return (
          <div className='animate-fadeIn'>
            <TeamGoalsByGame teamStatisticsData={teamStatisticsData} />
          </div>
        );
      case 'exit':
        setTeam(0);
        setCountry('');
        setSeason(0);
        setLeague(0);
        navigate('/home');
        return null;
      default:
        return null;
    }
  }, [
    currentMenuItem,
    navigate,
    playersListData,
    setCountry,
    setLeague,
    setSeason,
    setTeam,
    teamStatisticsData,
  ]);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='animate-scaleIn w-[1100px] max-large:w-[95%] max-medium:flex-col h-[700px] bg-white shadow-xl rounded-sm flex'>
        {isFetchingData ? (
          <div className='w-full h-full flex justify-center items-center flex-col'>
            <h1 className='font-bold text-2xl mb-5'>Loading team data...</h1>
            <Loader />
          </div>
        ) : (
          <>
            <div className='w-[20%] max-medium:w-full max-medium:m-auto shadow-xl h-full max-medium:h-[40%] px-3'>
              <TeamSideMenu
                teamInfo={teamInfo}
                currentMenuItem={currentMenuItem}
                setCurrentMenuItem={handleMenuChange}
              />
            </div>
            <div className='w-[80%] max-medium:w-full max-medium:h-[60%] px-2'>
              <SideMenuItems />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Team;
