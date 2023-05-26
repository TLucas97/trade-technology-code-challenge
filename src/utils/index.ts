export const createBaseArrayForChart = (
  lineups: { formation: string; played: number }[],
): {
  array1: string[];
  array2: number[];
} => {
  if (!lineups) return { array1: [], array2: [] };
  const array1: string[] = [];
  const array2: number[] = [];

  for (const lineup of lineups) {
    array1.push(lineup.formation);
    array2.push(lineup.played);
  }

  return { array1, array2 };
};

interface ChartData {
  labels: string[];
  datasets: {
    name: string;
    values: number[];
  }[];
}

export const convertGoalsToChartData = (goals: any): ChartData => {
  if (!goals) return { labels: [], datasets: [] };

  const homeGoalsFor = goals.for.total.home;
  const awayGoalsFor = goals.for.total.away;
  const totalGoalsFor = goals.for.total.total;
  const homeGoalsAgainst = goals.against.total.home;
  const awayGoalsAgainst = goals.against.total.away;
  const totalGoalsAgainst = goals.against.total.total;

  const minuteData = Object.entries(goals.for.minute).map(([minute, data]) => ({
    minute,
    goalsFor: (data as { total: number }).total,
    goalsAgainst: (goals.against.minute[minute] as { total: number }).total,
  }));

  const chartData: ChartData = {
    labels: [
      'Home',
      'Away',
      'Total',
      ...minuteData
        .filter((data) => data.minute !== '0-15')
        .map((data) => `${data.minute.replace('16-30', '15-45')} minutes`),
    ],
    datasets: [
      {
        name: 'Goals For',
        values: [
          homeGoalsFor,
          awayGoalsFor,
          totalGoalsFor,
          ...minuteData
            .filter((data) => data.minute !== '0-15')
            .map((data) => data.goalsFor),
        ],
      },
      {
        name: 'Goals Against',
        values: [
          homeGoalsAgainst,
          awayGoalsAgainst,
          totalGoalsAgainst,
          ...minuteData
            .filter((data) => data.minute !== '0-15')
            .map((data) => data.goalsAgainst),
        ],
      },
    ],
  };

  return chartData;
};
