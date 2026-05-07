import { useEffect, useState } from 'react';
import { getAllCountries } from '../../services/api';
import type { Country } from '../../types/country.types';

export function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    getAllCountries()
      .then(setCountries)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error)   return <p>Erro: {error}</p>;

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>
          <img src={country.flag} alt={country.flagAlt} width={32} />
          {country.name} — {country.capital} — {country.population.toLocaleString('pt-BR')} hab.
        </li>
      ))}
    </ul>
  );
}