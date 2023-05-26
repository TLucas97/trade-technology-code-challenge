interface TeamResultsProps {
  teamStatisticsData: any;
}

const TeamResults = ({ teamStatisticsData }: TeamResultsProps) => {
  return (
    <div className='w-full h-[700px] max-medium:h-[400px] max-medium:border-b-[1px] py-2 overflow-scroll overflow-x-hidden'>
      <h1 className='font-bold text-2xl mb-10'>
        Season: {teamStatisticsData?.response?.league?.season || 'N/A'}
      </h1>
      {teamStatisticsData ? (
        <table className='shadow-lg rounded-lg overflow-hidden w-full h-[50%]'>
          <thead className='bg-gray-200 text-gray-700'>
            <tr>
              <th className='px-4 py-2'></th>
              <th className='px-4 py-2'>Home</th>
              <th className='px-4 py-2'>Away</th>
              <th className='px-4 py-2'>Total</th>
            </tr>
          </thead>
          <tbody className='bg-white text-gray-700'>
            <tr>
              <td className='border px-4 py-2 font-medium'>Played</td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.played?.home || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.played?.away || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.played?.total || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 font-medium'>Wins</td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.wins?.home || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.wins?.away || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.wins?.total || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 font-medium'>Draws</td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.draws?.home || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.draws?.away || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.draws?.total || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 font-medium'>Loses</td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.loses?.home || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.loses?.away || 'N/A'}
              </td>
              <td className='border px-4 py-2'>
                {teamStatisticsData?.response?.fixtures?.loses?.total || 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h1 className='font-bold text-2xl mb-10'>No data available</h1>
      )}
    </div>
  );
};

export default TeamResults;
