'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Col, Image, Row } from "react-bootstrap";

export default function Page({ params }) {
    const [series, setSeries] = useState(null);
    const [creditos, setCreditos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tvResponse = await apiMovie.get(`tv/${params.id}`);
                setSeries(tvResponse.data);

                const creditsResponse = await apiMovie.get(`tv/${params.id}/credits`);
                setCreditos(creditsResponse.data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if (loading) return <p>Loading...</p>;

    return (
        <Pagina titulo="Séries">
            <div style={{ marginBottom: "40px" }}></div>
            {series && (
                <div>
                    <Row className="mt-3">
                        <Col md={4}>
                            <Image src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.title} fluid />
                        </Col>
                        <Col md={4}>
                            <p><b>Título original: </b>{series.original_name}</p>
                            <p><b>Popularidade: </b>{series.popularity}</p>
                            <p><b>Data de lançamento: </b>{series.first_air_date}</p>
                            <p><b>Temporadas: </b>{series.number_of_seasons}</p>
                            <p><b>Episódios: </b>{series.number_of_episodes}</p>
                            <p><b>Sinopse: </b>{series.overview}</p>
                            <a href="/series/card">
                                <Button variant="primary">Voltar</Button>
                            </a>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <h2>Temporadas</h2>
                        {series.seasons.slice().map(season => (
                            <Col md={2} key={season.id} className="mb-3">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w185${season.poster_path}`}
                                    alt={season.name}
                                    fluid
                                />
                                <p><b>{season.name}</b></p>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            {creditos && creditos.cast && (
                                <div>
                                    <h2>Atores</h2>
                                    <Row>
                                        {creditos.cast.slice(0, 12).map(actor => (
                                            <Col md={2} key={actor.id} className="mb-3">
                                                <a href={`/atoresseries/${actor.id}`} target="_blank" rel="noopener noreferrer">
                                                <Image src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} fluid />
                                                </a>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            )}
        </Pagina>
    );
}