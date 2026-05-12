import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByName } from '../../services/api';
import { Container, Typography } from '@mui/material';
import type { Country } from '../../types/country.types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';



export function Detalhes() {

    const { name } = useParams<{ name: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [country, setCountry] = useState<Country | null>(null);

    useEffect(() => {

        if (!name) return;

        getCountryByName(name)
            .then(setCountry)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, [name]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <Container sx={{ padding: '80px', minHeight: '100vh', justifyItems: 'center' }}>

            <Card >
                <CardMedia
                    component="img"
                    height="350"
                    image={country?.flag}
                    alt={country?.flagAlt}
                />
            </Card>
            <div>
                <Typography>Nome: {country?.name}</Typography>
                <Typography>Nome Oficial: {country?.officialName}</Typography>
                <Typography>Capital: {country?.capital}</Typography>
                <Typography>População: {country?.population}</Typography>
                <Typography>Região: {country?.region}</Typography>
                <Typography>Sub-região: {country?.subregion}</Typography>
                <Typography>Moeda: {country?.currencies}</Typography>
                <Typography>Língua: {country?.languages}</Typography>
                <Typography>Fuso horário: {country?.timezones}</Typography>
                <Typography>Fronteira: {country?.borders.join(' | ')}</Typography>
                <Typography>Área: {country?.area}</Typography>
            </div>
        </Container>


    );
}

