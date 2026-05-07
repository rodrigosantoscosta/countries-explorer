# SDD

**Projeto:** Countries Explorer
**Stack:** React · TypeScript · MUI · Axios · React Router v6 · Vite · Vercel
**Integrante:** A(Rodrigo)
**Branch:** `rodrigo`
**Sprint:** 1

---

## API Layer

### Escopo

Este documento descreve o design da camada de dados do projeto.
Cobre tipagem, normalização e serviço de API.

---

### Arquivos

```
src/
├── types/
│   └── country.types.ts
└── services/
    ├── normalizer.ts
    └── api.ts
```

---

### 1. Tipagem — `country.types.ts`

#### Responsabilidade

Definir os contratos de dados usados em toda a aplicação.
Nenhum outro arquivo deve criar interfaces de país fora deste módulo.

#### Modelos

| Modelo | Descrição |
|---|---|
| `RawCountry` | Reflete o JSON bruto da API — campos opcionais marcados com `?` |
| `Country` | Modelo normalizado da UI — nenhum campo opcional |
| `Region` | Union type com os 5 continentes aceitos pela API |
| `SortCriterion` | Union type com os 4 critérios de ordenação da listagem |

#### Campos de `Country`

| Campo | Tipo | Origem na API |
|---|---|---|
| `name` | `string` | `name.common` |
| `officialName` | `string` | `name.official` |
| `capital` | `string` | `capital[0]` |
| `population` | `number` | `population` |
| `region` | `string` | `region` |
| `subregion` | `string` | `subregion` |
| `flag` | `string` | `flags.svg` |
| `flagAlt` | `string` | `flags.alt` |
| `currencies` | `string[]` | `currencies` (objeto → array) |
| `languages` | `string[]` | `languages` (objeto → array) |
| `timezones` | `string[]` | `timezones` |
| `borders` | `string[]` | `borders` |
| `area` | `number` | `area` |

---

### 2. Normalização — `normalizer.ts`

#### Responsabilidade

Converter `RawCountry` (JSON da API) em `Country` (modelo da UI),
garantindo que nenhum campo chegue `undefined` nos componentes.

#### Regras de transformação

| Campo | Transformação |
|---|---|
| `capital` | `capital?.[0]` com fallback `'N/A'` |
| `subregion` | Fallback `'N/A'` se ausente |
| `flagAlt` | Fallback `"Bandeira de {name}"` se ausente |
| `currencies` | `Object.values()` → `"Nome (Símbolo)"` por item |
| `languages` | `Object.values()` → `string[]` |
| `borders` | Fallback `[]` se ausente |

#### Dependências

- `country.types.ts` — interfaces `RawCountry` e `Country`

---

### 3. Serviço de API — `api.ts`

#### Responsabilidade

Centralizar toda comunicação com a REST Countries API.
Nenhum outro arquivo deve instanciar Axios ou fazer requisições diretamente.

#### Instância Axios

| Configuração | Valor | Motivo |
|---|---|---|
| `baseURL` | `https://restcountries.com/v3.1` | Evitar repetição em cada função |
| `timeout` | `10000ms` | API pública pode ter lentidão eventual |

#### Interceptor de erro

Intercepta todas as respostas com erro e lança um `Error` com mensagem legível.
As funções de serviço não precisam de `try/catch` próprio.

#### Funções de serviço

| Função | Método | Endpoint | Retorno |
|---|---|---|---|
| `getAllCountries()` | GET | `/all?fields=...` | `Promise<Country[]>` |
| `getCountryByName(name)` | GET | `/name/{name}` | `Promise<Country>` |
| `getCountriesByRegion(region)` | GET | `/region/{region}` | `Promise<Country[]>` |
| `getCountriesByLang(code)` | GET | `/lang/{code}` | `Promise<Country[]>` |

> `getAllCountries` usa `?fields=` para reduzir o payload da resposta.

#### Comportamento de erro

| Situação | Resultado |
|---|---|
| API fora do ar | `Error('Erro ao conectar com a API')` via interceptor |
| País não encontrado (404) | `Error('País não encontrado')` em `getCountryByName` |
| Timeout > 10s | `Error('timeout exceeded')` pelo Axios |
| Array vazio no retorno | `Error('País não encontrado')` em `getCountryByName` |

#### Dependências

- `country.types.ts` — interfaces e types
- `normalizer.ts` — função `normalizeCountry`

---

## Fluxo de dados

```
REST Countries API
      ↓  JSON bruto (RawCountry)
  api.ts  →  normalizer.ts
      ↓  objeto limpo (Country)
  hooks / componentes
```

---

## Checklist de entrega

- [x] Sem erros de TypeScript (`npm run build`)
- [x] Sem chamadas `axios` fora de `api.ts`
- [x] Todos os campos opcionais têm fallback no normalizador
- [x] Interceptor de erro global configurado(Axios Interceptor)

---

## Commit sugerido

```bash
git commit -m "feat(api): add typed country models, normalizer and axios service functions"
```

---

## Referências

- REST Countries API: https://restcountries.com/v3.1
- Axios: https://axios-http.com/docs/intro
- TypeScript: https://www.typescriptlang.org/docs/handbook/utility-types.html
