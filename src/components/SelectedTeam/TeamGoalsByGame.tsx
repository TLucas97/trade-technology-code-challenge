import ReactFrappeChart from 'react-frappe-charts';
import { convertGoalsToChartData } from '../../utils';

interface TeamGoalsByGameProps {
  teamStatisticsData: any;
}

const TeamGoalsByGame = ({ teamStatisticsData }: TeamGoalsByGameProps) => {
  const chartData = convertGoalsToChartData(teamStatisticsData.response.goals);

  return (
    <div className='w-full h-[700px] max-medium:h-[400px] max-medium:border-b-[1px] justify-center items-center py-2 overflow-scroll overflow-x-hidden'>
      <h1 className='font-bold text-2xl mb-2'>
        Season: {teamStatisticsData?.response?.league?.season || 'N/A'}
      </h1>
      {teamStatisticsData?.response?.goals || !teamStatisticsData?.response ? (
        <>
          <h1 className='font-bold text-2xl'>Goal statistics</h1>
          <div className='mt-16'>
            <ReactFrappeChart
              type='axis-mixed'
              colors={['#2138ba9b', '#ff0000']}
              axisOptions={{
                xAxisMode: 'tick',
                yAxisMode: 'tick',
                xIsSeries: 1,
              }}
              height={450}
              data={chartData}
            />
          </div>
        </>
      ) : (
        <h1 className='font-bold text-2xl'>No data available</h1>
      )}
    </div>
  );
};

export default TeamGoalsByGame;
