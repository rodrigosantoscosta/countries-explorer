import axios from 'axios';
import type { Country, RawCountry, Region } from '../types/country.types';
import { normalizeCountry } from './normalizer';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message ?? 'Erro ao conectar com a API';
    return Promise.reject(new Error(message));
  }
);

const FIELDS = 'name,capital,population,flags,region,subregion,borders,area';

export async function getAllCountries(): Promise<Country[]> {
  const { data } = await api.get<RawCountry[]>(`/all?fields=${FIELDS}`);
  return data.map(normalizeCountry);
}

export async function getCountryByName(name: string): Promise<Country> {
  const { data } = await api.get<RawCountry[]>(`/name/${name}`);
  if (!data.length) throw new Error('País não encontrado');
  return normalizeCountry(data[0]);
}

export async function getCountriesByRegion(region: Region): Promise<Country[]> {
  const { data } = await api.get<RawCountry[]>(`/region/${region}`);
  return data.map(normalizeCountry);
}

export async function getCountriesByLang(code: string): Promise<Country[]> {
  const { data } = await api.get<RawCountry[]>(`/lang/${code}`);
  return data.map(normalizeCountry);
}