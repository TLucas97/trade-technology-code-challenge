import api from './api';
import toast from 'react-hot-toast';

interface ApiResponse {
  data: {
    errors: {
      token: string;
      requests: string;
    };
    results?: number;
    paging?: {
      current: number;
      total: number;
    };
    response?: any[];
  };
}

export const fetchCountries = async (
  apiKey: string,
): Promise<number | string[] | Record<string, unknown> | boolean> => {
  try {
    const response: ApiResponse = await api.get(`/countries`, {
      headers: {
        'x-rapidapi-key': apiKey,
      },
    });
    console.log('🚀 ~ response:', response);

    if (response?.data?.errors.requests) {
      toast.error('You exceeded the limit of requests per hour.');
      return false;
    }

    if (response?.data?.errors.token) {
      toast.error('Invalid API key.');
      return false;
    }

    return response?.data?.response || false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchSeasons = async (apiKey: string) => {
  try {
    const response: ApiResponse = await api.get(`/leagues/seasons`, {
      headers: {
        'x-rapidapi-key': apiKey,
      },
    });

    if (response?.data?.errors.requests) {
      toast.error('You exceeded the limit of requests per hour.');
      return false;
    }

    if (response?.data?.errors.token) {
      toast.error('Invalid API key.');
      return false;
    }

    return response?.data?.response || false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchLeagues = async (
  apiKey: string,
  country: string,
  season: number,
) => {
  try {
    const response: ApiResponse = await api.get(
      `/leagues?country=${country.toLowerCase()}&season=${season}`,
      {
        headers: {
          'x-rapidapi-key': apiKey,
        },
      },
    );

    if (response?.data?.errors.requests) {
      toast.error('You exceeded the limit of requests per hour.');
      return false;
    }

    if (response?.data?.errors.token) {
      toast.error('Invalid API key.');
      return false;
    }

    return response?.data?.response || false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchTeams = async (
  apiKey: string,
  country: string,
  season: number,
  league: number,
) => {
  try {
    const response: ApiResponse = await api.get(
      `/teams?country=${country}&season=${season}&league=${league}`,
      {
        headers: {
          'x-rapidapi-key': apiKey,
        },
      },
    );

    if (response?.data?.errors.requests) {
      toast.error('You exceeded the limit of requests per hour.');
      return false;
    }

    if (response?.data?.errors.token) {
      toast.error('Invalid API key.');
      return false;
    }

    return response?.data?.response || false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchSelectedTeamDetails = async (
  apiKey: string,
  season: number,
  league: number,
  team: number,
) => {
  try {
    const [statistics, info, players] = await Promise.all([
      api.get(
        `/teams/statistics?league=${league}&team=${team}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': apiKey,
          },
        },
      ),
      api.get(`/teams?id=${team}`, {
        headers: {
          'x-rapidapi-key': apiKey,
        },
      }),
      api.get(`/players?team=${team}&season=${season}&league=${league}`, {
        headers: {
          'x-rapidapi-key': apiKey,
        },
      }),
    ]);

    return {
      statistics: statistics?.data || false,
      info: info?.data || false,
      players: players?.data || false,
    };
  } catch (error) {
    console.error(error);
    return false;
  }
};
