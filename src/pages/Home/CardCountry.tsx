import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useEffect, useState } from 'react';
import { getAllCountries } from '../../services/api';
import type { Country } from '../../types/country.types';
import { Link } from "react-router-dom";


export default function CardCoutry() {

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCountries()
      .then(setCountries)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      {countries.map((country) => (
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', margin: '15px' }}>
          <CardActionArea component={Link} to={`/detalhes/${country.name}`}>
            <CardMedia
              component="img"
              height="140"
              image={country.flag}
              alt={country.flagAlt}
            />
            <CardContent sx={{ FlexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {country.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {country.capital} — {country.population.toLocaleString('pt-BR')} hab.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

    </div>
  );
   

}