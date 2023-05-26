import { ContextData } from '../../ContextWrapper';
import { fetchSeasons } from '../../service/requests';
import { useContext, useState, useEffect } from 'react';
// import { seasonsList } from '../mocks/seasons_list';
import { IoClose } from 'react-icons/io5';
import Loader from '../Loader';
import toast from 'react-hot-toast';

const SeasonsList = () => {
  const { country, season, setSeason, seasons, setSeasons } =
    useContext(ContextData);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState<boolean>(false);

  const handleSeasonRemoval = (currentSeason: number) => {
    if (season === currentSeason) {
      setSeason(0);
    }
  };

  useEffect(() => {
    const key = localStorage.getItem('apiKey');
    const seasonsFromStorage = localStorage.getItem('seasons');

    if (key) {
      const fetchSeasonsList = async () => {
        try {
          if (seasonsFromStorage) {
            setSeasons(JSON.parse(seasonsFromStorage));
            return;
          }
          setIsLoadingSeasons(true);
          const response = await fetchSeasons(key);

          if (!response) {
            setIsLoadingSeasons(false);
            return;
          }

          setSeasons(response);
          setIsLoadingSeasons(false);
          localStorage.setItem('seasons', JSON.stringify(response));
        } catch (error) {
          console.log(error);
          setIsLoadingSeasons(false);
          toast.error('Something went wrong! Please try again later.');
        }
      };

      fetchSeasonsList();
    }
  }, [country, seasons.length, setSeasons]);

  return (
    <div className='w-full h-full flex justify-center animate-fadeIn'>
      {isLoadingSeasons ? (
        <div className='w-full h-[250px] flex justify-center animate-fadeIn mt-[10em]'>
          <Loader />
        </div>
      ) : (
        <div className='w-full flex flex-col items-center mt-4 px-3'>
          <h1 className='text-2xl font-bold'>Select a season</h1>
          <div className='w-full h-[45px] flex justify-end items-end mt-2'>
            {season !== 0 && (
              <div className='animate-fadeIn flex gap-x-2 items-center  py-1 px-3 bg-orange-200'>
                <span>
                  Selected season: <strong>{season}</strong>
                </span>
                <button onClick={() => setSeason(0)}>
                  <IoClose className='text-xl' />
                </button>
              </div>
            )}
          </div>
          <div className='w-full h-full flex flex-col border-[1px] mt-3 overflow-scroll overflow-x-hidden'>
            {seasons.map((data: any, i) => (
              <div
                key={i}
                className={`w-full flex items-center justify-between px-2 border-b-[1px] border-t-[1px] cursor-pointer hover:bg-gray-200 ${
                  season === data && 'bg-gray-200'
                }`}
                onClick={() => {
                  setSeason(data);
                  handleSeasonRemoval(data);
                }}
              >
                <div className='flex items-center gap-x-2'>
                  <p className='text-lg'>
                    Season: <strong>{data}</strong>
                  </p>
                </div>
                <h2 className='text-gray-600'>Select season</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonsList;
