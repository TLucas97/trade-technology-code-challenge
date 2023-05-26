import { MdPlace } from 'react-icons/md';

interface TeamPlayersListProps {
  playersListData: any;
  teamStatisticsData?: any;
}

const TeamPlayersList = ({
  playersListData,
  teamStatisticsData,
}: TeamPlayersListProps) => {
  return (
    <div className='w-full h-[700px] max-medium:h-[400px] max-medium:border-b-[1px] flex flex-col gap-y-4 overflow-scroll overflow-x-hidden py-2'>
      <h1 className='font-bold text-2xl'>
        Season: {teamStatisticsData?.response?.league?.season || 'N/A'}
      </h1>
      {playersListData?.response.length > 0 || !playersListData.response ? (
        playersListData.response.map((data: any, i: any) => (
          <div
            className='w-full h-[75px] flex items-center justify-between px-3 shadow-xl bg-white'
            key={i}
          >
            <div className='flex items-center gap-x-3 h-full font-bold text-gray-800'>
              <img
                src={data.player?.photo || ''}
                alt='photo'
                className='h-full'
              />
              <h1>
                {data.player?.firstname || 'N/A'}{' '}
                {data.player?.lastname || 'N/A'}, {data.player?.age || 'N/A'}
              </h1>
            </div>
            <div className='flex items-center gap-x-1'>
              <MdPlace className='text-gray-800 text-xl' />
              <h1 className='font-bold text-xl'>
                {data.player?.nationality || 'N/A'}
              </h1>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1 className='font-bold text-2xl'>
            No players list data available.
          </h1>
        </div>
      )}
    </div>
  );
};

export default TeamPlayersList;
