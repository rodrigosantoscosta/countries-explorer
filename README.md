# Countries Explorer

Aplicação web acadêmica que consome a [REST Countries API](https://restcountries.com/v3.1) para exibir informações detalhadas de países.

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| [React](https://react.dev) | 19+ | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org) | 5+ | Tipagem estática |
| [Vite](https://vitejs.dev) | 6+ | Build tool e dev server |
| [MUI (Material UI)](https://mui.com/material-ui) | 6+ | Componentes de interface |
| [Axios](https://axios-http.com) | 1+ | Requisições HTTP |
| [React Router v6](https://reactrouter.com) | 6+ | Roteamento SPA |
| [Chart.js](https://www.chartjs.org) + [react-chartjs-2](https://react-chartjs-2.js.org) | latest | Gráficos |
| [Vercel](https://vercel.com) | — | Deploy e hospedagem |

---

## Instalação e uso

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/countries-explorer.git
cd countries-explorer

# Instalar dependências
npm install

# Rodar
npm run dev

```

---

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Listagem geral com busca, filtro por região e ordenação |
| `/country/:name` | Detalhes completos de um país |
| `/region/:name` | Países de um continente com estatísticas |
| `/lang/:code` | Países que falam um determinado idioma *(opcional)* |

---

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Rodrigo Santos | API Layer — serviços Axios, cache, normalização e hooks |
| A | Frontend — listagem, Navbar, SearchBar e responsividade |
| C | Detalhe — páginas de país, região, gráfico e README |
