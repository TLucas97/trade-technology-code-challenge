import { createContext } from 'react';
import { useState } from 'react';

type ContextData = {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  country: string;
  setCountry: (country: string) => void;
  countries: string[];
  setCountries: (countries: any) => void;
  seasons: number[];
  setSeasons: (seasons: any) => void;
  season: number;
  setSeason: (season: number) => void;
  league: number;
  setLeague: (league: number) => void;
  team: number;
  setTeam: (team: number) => void;
};

export const ContextData = createContext<ContextData>({
  apiKey: '',
  setApiKey: () => {},
  country: '',
  setCountry: () => {},
  seasons: [],
  setSeasons: () => {},
  season: 0,
  setSeason: () => {},
  league: 0,
  setLeague: () => {},
  team: 0,
  setTeam: () => {},
  countries: [],
  setCountries: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextWrapper = ({ children }: Props) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [seasons, setSeasons] = useState<number[]>([]);
  const [season, setSeason] = useState<number>(0);
  const [league, setLeague] = useState<number>(0);
  const [team, setTeam] = useState<number>(0);
  const [countries, setCountries] = useState<string[]>([]);

  return (
    <ContextData.Provider
      value={{
        apiKey,
        setApiKey,
        country,
        setCountry,
        seasons,
        setSeasons,
        season,
        setSeason,
        league,
        setLeague,
        team,
        setTeam,
        countries,
        setCountries,
      }}
    >
      <main className='bg-calm w-full h-screen flex justify-between flex-col'>
        {children}
      </main>
    </ContextData.Provider>
  );
};
