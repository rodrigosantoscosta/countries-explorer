import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getAllCountries } from '../../services/api';
import type { Country } from '../../types/country.types';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
        legend: { position: 'right' as const },
        title: { display: true, text: 'Numero total da população de cada país' },
    },
};

export function GraficoCountry() {
    const [chartData, setChartData] = useState<any>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllCountries()
            .then((countries) => {

                const paisesOrdenados = [...countries].sort(
                    (country_a, country_b) => country_b.population - country_a.population
                );

                const top10Paises = paisesOrdenados.slice(0, 10);

                setCountries(top10Paises);

                const nomes = top10Paises.map((country) => country.name);
                const populacao = top10Paises.map((country) => country.population);

                setChartData({
                    labels: nomes,
                    datasets: [
                        {
                            label: 'Total da População',
                            data: populacao,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                });
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;


    return (

        <div>
            {chartData ? <Bar options={options} data={chartData} /> : <p>Nenhum dado encontrado.</p>}
            <div style={{display: 'flex', gap:'10px'}}>
                {countries.slice(0, 4).map((country) =>
                    <Card sx={{ maxWidth: 300, width: '370px', margin: '10px' }} >

                        <CardMedia
                            component="img"
                            sx={{ height: 'auto', width: '100%', display: 'block' }}
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
                    </Card>
                )}
            </div>
        </div>

    )

}

