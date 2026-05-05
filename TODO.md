# TODO — Countries Explorer

> Projeto acadêmico com a [REST Countries API](https://restcountries.com/v3.1)
> **Stack:** React · TypeScript · MUI · Axios · React Router v6 · Vite · Vercel
> **Base URL:** `https://restcountries.com/v3.1`
> **Grupo:** 3 integrantes | **Sprints:** 3 semanas

---

## Tarefas Compartilhadas

### Sprint 0 — Setup (Semana 1, primeiros dias)

- [ ] Criar repositório no GitHub com branch `main` protegida
- [ ] Definir branches de trabalho: `feat/api-layer`, `feat/listing`, `feat/detail-region`
- [ ] Inicializar projeto:
  ```bash
  npm create vite@latest countries-explorer -- --template react-ts
  cd countries-explorer
  npm install
  ```
- [ ] Instalar dependências:
  ```bash
  npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
  npm install axios
  npm install react-router-dom
  ```
- [ ] Configurar estrutura de pastas:
  ```
  src/
  ├── services/        ← Integrante A (api.ts, cache.ts)
  ├── hooks/           ← Integrante A (useFetch.ts, useCountries.ts)
  ├── types/           ← Integrante A (country.types.ts)
  ├── pages/
  │   ├── Home/        ← Integrante B
  │   ├── CountryDetail/ ← Integrante C
  │   └── Region/      ← Integrante C
  ├── components/
  │   ├── CountryCard/ ← Integrante B
  │   ├── SearchBar/   ← Integrante B
  │   ├── Navbar/      ← Integrante B
  │   └── SkeletonCard/ ← Integrante B
  ├── theme/           ← todos (theme.ts)
  └── App.tsx          ← todos (rotas)
  ```
- [ ] Configurar tema MUI base em `src/theme/theme.ts` com paleta e tipografia definidas pelo grupo
- [ ] Configurar `ThemeProvider` e `CssBaseline` no `main.tsx`
- [ ] Configurar `BrowserRouter` no `main.tsx`
- [ ] Definir rotas no `App.tsx`:
  ```tsx
  <Routes>
    <Route path="/"               element={<Home />} />
    <Route path="/country/:name"  element={<CountryDetail />} />
    <Route path="/region/:name"   element={<Region />} />
    <Route path="/lang/:code"     element={<Lang />} />   {/* opcional */}
  </Routes>
  ```
- [ ] Conectar repositório ao Vercel (deploy automático a cada push na `main`)
- [ ] Adicionar `vercel.json` para suporte a rotas SPA:
  ```json
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
- [ ] Definir convenção de commits: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`

### Sprint 3 — Integração Final (Semana 3)

- [ ] Revisar integração entre módulos (A → B → C)
- [ ] Testar responsividade nos breakpoints do MUI: `xs` (0), `sm` (600), `md` (900), `lg` (1200)
- [ ] Corrigir bugs de integração encontrados
- [ ] Revisar acessibilidade: `alt` nas imagens, navegação por teclado, contraste de cores
- [ ] Verificar build de produção: `npm run build` sem erros de TypeScript
- [ ] Confirmar deploy no Vercel funcionando com todas as rotas
- [ ] Preparar apresentação: cada integrante apresenta seu módulo
- [ ] Fazer merge das branches para `main` e tag `v1.0.0`

---

## 👤 Integrante A — API Layer, Types & Hooks

> Toda comunicação com a API passa por aqui. Os outros importam os hooks e tipos deste módulo.

**Branch:** `feat/api-layer`

### 1. Tipagem (`src/types/country.types.ts`)

- [ ] Criar interface `RawCountry` que reflete o JSON da API:
  ```ts
  export interface RawCountry {
    name:        { common: string; official: string };
    capital?:    string[];
    population:  number;
    region:      string;
    subregion?:  string;
    flags:       { svg: string; alt?: string };
    currencies?: Record<string, { name: string; symbol: string }>;
    languages?:  Record<string, string>;
    timezones:   string[];
    borders?:    string[];
    area:        number;
  }
  ```
- [ ] Criar interface `Country` (dados normalizados usados pela UI):
  ```ts
  export interface Country {
    name:         string;
    officialName: string;
    capital:      string;
    population:   number;
    region:       string;
    subregion:    string;
    flag:         string;
    flagAlt:      string;
    currencies:   string[];
    languages:    string[];
    timezones:    string[];
    borders:      string[];
    area:         number;
  }
  ```
- [ ] Criar type `Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'`
- [ ] Criar type `SortCriterion = 'name-asc' | 'name-desc' | 'pop-desc' | 'pop-asc'`

### 2. Instância do Axios (`src/services/api.ts`)

- [ ] Criar instância configurada do Axios:
  ```ts
  import axios from 'axios';

  const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    timeout: 10000,
  });
  ```
- [ ] Criar função `getAllCountries(): Promise<Country[]>`
- [ ] Criar função `getCountryByName(name: string): Promise<Country>`
- [ ] Criar função `getCountriesByRegion(region: Region): Promise<Country[]>`
- [ ] Criar função `getCountriesByLang(code: string): Promise<Country[]>`
- [ ] Adicionar interceptor de erro global no Axios

### 3. Cache em memória (`src/services/cache.ts`)

- [ ] Criar Map de cache tipado: `const cache = new Map<string, Country[]>()`
- [ ] Criar função `getCached<T>(key: string, fetchFn: () => Promise<T>): Promise<T>`
- [ ] Usar `getCached` dentro de `getAllCountries` com chave `'all'`

### 4. Normalização (`src/services/normalizer.ts`)

- [ ] Criar função `normalizeCountry(raw: RawCountry): Country`
- [ ] Aplicar em todos os retornos de `api.ts`

### 5. Hooks reutilizáveis (`src/hooks/`)

- [ ] Criar hook `useFetch<T>(fetchFn: () => Promise<T>)`
- [ ] Criar hook `useCountries()`
- [ ] Criar função `filterAndSort(countries: Country[], query: string, region: string, sort: SortCriterion): Country[]`

---

## 👤 Integrante B — Frontend & Listagem

> Rota `/` — tela principal. Importa hooks e tipos do Integrante A.

**Branch:** `feat/listing`

### 1. Componente `CountryCard` (`src/components/CountryCard/`)

- [ ] Criar `CountryCard.tsx` usando MUI `Card`, `CardMedia`, `CardContent`
- [ ] Exibir bandeira, nome, capital e população formatada
- [ ] Envolver em `<Link to={`/country/${country.name}`}>`
- [ ] Adicionar hover com elevação
- [ ] Exportar via `index.ts`

### 2. Grid de países (`src/pages/Home/`)

- [ ] Criar `Home.tsx` com MUI `Grid`
- [ ] Renderizar lista de `CountryCard`
- [ ] Exibir contador de países
- [ ] Criar estado vazio com `Alert`

### 3. Navbar (`src/components/Navbar/`)

- [ ] Criar `Navbar.tsx` com MUI `AppBar` e `Toolbar`
- [ ] Incluir logo/título
- [ ] Incluir botão de dark/light mode com ícones do MUI
- [ ] Tornar sticky

### 4. `SearchBar` com filtros (`src/components/SearchBar/`)

- [ ] Criar busca com `TextField` e `InputAdornment`
- [ ] Implementar debounce de 300ms
- [ ] Criar `Select` de região
- [ ] Criar `Select` de ordenação
- [ ] Emitir callbacks para o `Home.tsx`

### 5. Skeleton loading (`src/components/SkeletonCard/`)

- [ ] Criar `SkeletonCard.tsx` com MUI `Skeleton`
- [ ] Exibir 12 skeletons enquanto `loading === true`
- [ ] Reutilizar o grid da home

### 6. Responsividade

- [ ] Verificar `xs`, `sm`, `md`, `lg`
- [ ] No mobile, organizar busca e filtros em coluna
- [ ] Garantir touch target mínimo de 44x44
- [ ] Testar dark e light mode

---

## 👤 Integrante C — Detalhe & Visualização

> Rotas `/country/:name` e `/region/:name`. Importa hooks e tipos do Integrante A.

**Branch:** `feat/detail-region`

### 1. Página de detalhes (`src/pages/CountryDetail/`)

- [ ] Ler parâmetro com `useParams()`
- [ ] Buscar país por nome
- [ ] Criar layout com `Grid`
- [ ] Exibir todos os campos: nome oficial, capital, população, região, sub-região, moedas, idiomas, fusos, área
- [ ] Criar seção de fronteiras com `Chip`
- [ ] Adicionar botão “Voltar”
- [ ] Criar loading com `CircularProgress`
- [ ] Criar error state com `Alert`

### 2. Página por região (`src/pages/Region/`)

- [ ] Ler parâmetro da URL com `useParams()`
- [ ] Buscar países da região
- [ ] Exibir cabeçalho com estatísticas
- [ ] Criar navegação entre regiões com `Tabs`
- [ ] Reutilizar `CountryCard`
- [ ] Criar loading e estado vazio

### 3. Gráfico de população

- [ ] Instalar `chart.js` e `react-chartjs-2`
- [ ] Criar `PopulationChart.tsx`
- [ ] Mostrar top 10 países por população
- [ ] Usar barras horizontais
- [ ] Usar cor primária do tema MUI

### 4. Países por idioma (`src/pages/Lang/`) *(opcional)*

- [ ] Ler `:code` com `useParams()`
- [ ] Buscar países por idioma
- [ ] Criar select de idiomas
- [ ] Atualizar URL ao trocar idioma
- [ ] Reutilizar `CountryCard`

### 5. README do projeto (`README.md`)

- [ ] Título e descrição do projeto
- [ ] Badge do Vercel com link para o deploy
- [ ] Screenshot da aplicação
- [ ] Instruções `npm install`, `npm run dev`, `npm run build`
- [ ] Tabela de tecnologias
- [ ] Tabela de rotas
- [ ] Resumo da divisão de tarefas
- [ ] Link do deploy

---

## 📦 Entregáveis Finais

| Item | Responsável | Status |
|------|-------------|--------|
| `country.types.ts` com interfaces tipadas | A | ⬜ |
| Instância Axios + funções de serviço | A | ⬜ |
| Cache em memória + normalização | A | ⬜ |
| Hook `useFetch` + `useCountries` | A | ⬜ |
| Função `filterAndSort` | A | ⬜ |
| Componente `CountryCard` | B | ⬜ |
| Grid de países (Home) + contador | B | ⬜ |
| Navbar com dark mode toggle | B | ⬜ |
| SearchBar com debounce + filtros | B | ⬜ |
| SkeletonCard (12 itens no loading) | B | ⬜ |
| Página `/country/:name` completa | C | ⬜ |
| Página `/region/:name` com stats | C | ⬜ |
| Gráfico top 10 populações | C | ⬜ |
| Página `/lang/:code` | C | ⬜ |
| README com badge Vercel + screenshot | C | ⬜ |
| Deploy no Vercel funcionando | Todos | ⬜ |
| `vercel.json` com rewrite para SPA | Todos | ⬜ |

---

## 📅 Cronograma

| Sprint | Período | Foco |
|--------|---------|------|
| Sprint 0 | Dias 1–2 | `npm create vite`, instalar deps, definir tema MUI, configurar Vercel |
| Sprint 1 | Semana 1 | Types + Axios (A) · CountryCard + Skeleton (B) · estrutura das páginas (C) |
| Sprint 2 | Semana 2 | Hooks + cache + filtros (A) · Home completa (B) · Detalhe + Região (C) |
| Sprint 3 | Semana 3 | Integração, build TS sem erros, testes, responsividade, apresentação |

---

## 🔗 Referências

- API: https://restcountries.com/v3.1
- MUI: https://mui.com/material-ui
- Axios: https://axios-http.com
- React Router v6: https://reactrouter.com
- react-chartjs-2: https://react-chartjs-2.js.org
- Vercel deploy SPA: https://vercel.com/docs/frameworks/frontend/vite
