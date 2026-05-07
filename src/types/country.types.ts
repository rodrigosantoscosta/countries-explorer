export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export type SortCriterion = 'name-asc' | 'name-desc' | 'pop-desc' | 'pop-asc';

export interface RawCountry {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  flags: {
    svg: string;
    alt?: string;
  };
  currencies?: Record<string, {
    name: string;
    symbol: string;
  }>;
  languages?: Record<string, string>;
  timezones: string[];
  borders?: string[];
  area: number;
}

export interface Country {
  name: string;
  officialName: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  flag: string;
  flagAlt: string;
  currencies: string[];
  languages: string[];
  timezones: string[];
  borders: string[];
  area: number;
}