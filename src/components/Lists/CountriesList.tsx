import { ContextData } from '../../ContextWrapper';
import { fetchCountries } from '../../service/requests';
import { useContext, useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Input from '../UI/Input';
import Loader from '../Loader';
import toast from 'react-hot-toast';

const CountriesList = () => {
  const { countries, setCountries, country, setCountry } =
    useContext(ContextData);
  const [search, setSearch] = useState('');
  const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleCountryRemoval = (countryName: string) => {
    if (country === countryName) {
      setCountry('');
    }
  };

  const filteredCountries = countries.filter((country: any) => {
    return (
      country?.name?.toLowerCase().includes(search?.toLowerCase()) ||
      country?.code?.toLowerCase().includes(search?.toLowerCase())
    );
  });

  useEffect(() => {
    const key = localStorage.getItem('apiKey');
    const countriesFromStorage = localStorage.getItem('countries');

    if (key) {
      const fetchCountriesList = async () => {
        try {
          if (countriesFromStorage) {
            setCountries(JSON.parse(countriesFromStorage));
            return;
          }

          setIsLoadingCountries(true);
          const response = await fetchCountries(key);

          if (!response) {
            setIsLoadingCountries(false);
            return;
          }

          setCountries(response);
          setIsLoadingCountries(false);
          localStorage.setItem('countries', JSON.stringify(response));
        } catch (error) {
          console.log(error);
          setIsLoadingCountries(false);
          toast.error('Something went wrong! Please try again later.');
        }
      };

      fetchCountriesList();
    }
  }, [countries.length, setCountries]);

  return (
    <div className='w-full h-full flex justify-center animate-fadeIn'>
      {isLoadingCountries ? (
        <div className='w-full h-[250px] flex justify-center animate-fadeIn mt-[10em]'>
          <Loader />
        </div>
      ) : (
        <div className='w-full flex flex-col items-center mt-4 px-3'>
          <h1 className='text-2xl font-bold'>Select a country</h1>
          <div className='w-full flex justify-between items-end mt-2'>
            <div>
              <Input
                placeholder='Search for a country'
                onChange={handleSearch}
              />
            </div>
            {country && (
              <div className='animate-fadeIn flex gap-x-2 items-center  py-1 px-3 bg-orange-200'>
                <span>
                  Selected country: <strong>{country}</strong>
                </span>
                <button onClick={() => setCountry('')}>
                  <IoClose className='text-xl' />
                </button>
              </div>
            )}
          </div>
          <div className='w-full h-full flex flex-col border-[1px] mt-3 overflow-scroll overflow-x-hidden'>
            {filteredCountries.map((data: any, i) => (
              <div
                key={i}
                className={`w-full flex items-center justify-between px-2 border-b-[1px] border-t-[1px] cursor-pointer hover:bg-gray-200 ${
                  country === data.name && 'bg-gray-200'
                }`}
                onClick={() => {
                  setCountry(data.name);
                  handleCountryRemoval(data.name);
                }}
              >
                <div className='flex items-center gap-x-2'>
                  <img
                    src={data.flag}
                    alt='flag'
                    className='h-[25px] w-[25px]'
                  />
                  <p className='text-lg'>
                    {data.name} | <strong>{data.code}</strong>
                  </p>
                </div>
                <h2 className='text-gray-600'>Select country</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountriesList;
