import type { RawCountry, Country } from '../types/country.types';

export function normalizeCountry(raw: RawCountry): Country {
  return {
    name:         raw.name.common,
    officialName: raw.name.official,
    capital:      raw.capital?.[0] ?? 'N/A',
    population:   raw.population,
    region:       raw.region,
    subregion:    raw.subregion ?? 'N/A',
    flag:         raw.flags.svg,
    flagAlt:      raw.flags.alt ?? `Bandeira de ${raw.name.common}`,
    currencies:   Object.values(raw.currencies ?? {}).map(c => `${c.name} (${c.symbol})`),
    languages:    Object.values(raw.languages ?? {}),
    timezones:    raw.timezones,
    borders:      raw.borders ?? [],
    area:         raw.area,
  };
}