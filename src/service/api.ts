import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});

export default api;
