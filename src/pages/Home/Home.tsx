import { useEffect, useState } from 'react';
import { getAllCountries } from '../../services/api';
import type { Country } from '../../types/country.types';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Container } from '@mui/material';

export function Home() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busca, setBusca] = useState("")
  useEffect(() => {
    getAllCountries()
      .then(setCountries)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const countriesFiltro = countries.filter((country) =>
    country.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase()))
    .slice(0, 4);

  return (
    <div>
      <input list='country' placeholder='Buscar' value={busca} onChange={(e) => setBusca(e.target.value)} />       
      <Container sx={{ padding: { xs: 2, md: 10 }, display: 'flex', gap: '10px'}} >
        {countriesFiltro.length > 0 ? (
          countriesFiltro.map((country) => (
 
            <Card sx={{ maxWidth: 300, width: '370px', margin: '10px'}} >
              <CardActionArea key={country.name} style={{ margin: "5px 0", cursor: 'pointer' }} onClick={() => navigate(`/detalhes/${country.name}`)}>
                <CardMedia
                  component="img"
                  sx={{ height:'auto', width:'100%', display: 'block' }}
                  image={country.flag}
                  alt={country.flagAlt}
                  />
                <CardContent sx={{ FlexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {country.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {country.capital}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <p>Nenhum país encontrado.</p>
        )}
    </Container>
    </div>

    // <ul>
    //   {countries.map((country) => (
    //     <li key={country.name}>
    //       <img src={country.flag} alt={country.flagAlt} width={32} />
    //       {country.name} — {country.capital} — {country.population.toLocaleString('pt-BR')} hab.
    //     </li>
    //   ))}
    // </ul>
  );
}