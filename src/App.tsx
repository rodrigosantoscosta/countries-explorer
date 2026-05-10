import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Header } from './componets/Header';
import CardCoutry from './pages/Home/CardCountry';
import { Detalhes } from './pages/Home/Detalhes';


export default function App() {
  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detalhes/name" element={<Detalhes />} />
        <Route path="/card" element={<CardCoutry />} />

      </Routes>
    </BrowserRouter>
  );
}