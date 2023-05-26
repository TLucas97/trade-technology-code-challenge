import ReactFrappeChart from 'react-frappe-charts';
import { useCallback } from 'react';
import { createBaseArrayForChart } from '../../utils';

interface TeamFormationsProps {
  teamStatisticsData: any;
}

const TeamFormations = ({ teamStatisticsData }: TeamFormationsProps) => {
  const formationsData = createBaseArrayForChart(
    teamStatisticsData?.response?.lineups,
  );

  const Chart = useCallback(() => {
    return (
      <ReactFrappeChart
        type='bar'
        colors={['#11009E']}
        axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
        height={450}
        data={{
          labels: formationsData.array1,
          datasets: [{ values: formationsData.array2 }],
        }}
      />
    );
  }, [formationsData.array1, formationsData.array2]);

  return (
    <div className='w-full h-[700px] max-medium:h-[400px] max-medium:border-b-[1px] justify-center items-center py-2 overflow-scroll overflow-x-hidden'>
      <h1 className='font-bold text-2xl mb-2'>
        Season: {teamStatisticsData?.response?.league?.season || 'N/A'}
      </h1>
      {teamStatisticsData?.response?.lineups.length > 0 || !teamStatisticsData?.response ? (
        <>
          <h1 className='font-bold text-2xl'>Most used formations</h1>
          <ul className='mt-2 list-disc ml-5'>
            <li>Formation</li>
            <li>Times played</li>
          </ul>
          <div className='mt-16'>
            <Chart />
          </div>
        </>
      ) : (
        <h1 className='font-bold text-2xl'>No formations data available</h1>
      )}
    </div>
  );
};

export default TeamFormations;
