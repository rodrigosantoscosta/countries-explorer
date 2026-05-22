import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Header } from './components/Header';
import CardCoutry from './pages/Home/CardCountry';
import { Detalhes } from './pages/Home/Detalhes';
import { GraficoCountry } from './pages/Home/GraficoCountry';


export default function App() {
  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalhes/:name" element={<Detalhes />} />
        <Route path="/card" element={<CardCoutry />} />
        <Route path="/grafico" element={<GraficoCountry />} />
      </Routes>
    </BrowserRouter>
  );
}