'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Col, Image, Row } from "react-bootstrap";

export default function Page({ params }) {
    const [filme, setFilme] = useState(null);
    const [creditos, setCreditos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieResponse = await apiMovie.get(`movie/${params.id}`);
                setFilme(movieResponse.data);

                const creditsResponse = await apiMovie.get(`movie/${params.id}/credits`);
                setCreditos(creditsResponse.data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if (loading) return <p>Loading...</p>;

    return (
        <Pagina titulo="Filme">
            <div style={{ marginBottom: "40px" }}></div>
            {filme && (
                <div>
                    <p><h2>{filme.title}</h2></p>

                    <Row className="mt-3">
                        <Col md={4}>
                            <Image src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} fluid />
                        </Col>
                        <Col md={4}>
                            <p><b>Título original: </b>{filme.original_title}</p>
                            <p><b>Popularidade: </b>{filme.popularity}</p>
                            <p><b>Data de lançamento: </b>{filme.release_date}</p>
                            <p><b>Orçamento: </b>{filme.budget}</p>
                            <p><b>Gêneros: </b>{filme.genres.map(genre => genre.name).join(', ')}</p>
                            <p><b>Sinopse: </b>{filme.overview}</p>
                            <a href="/filmes/card">
                                <Button variant="primary">Voltar</Button>
                            </a>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            {creditos && creditos.cast && (
                                <div>
                                    <h2>Atores</h2>
                                    <Row>
                                        {creditos.cast.slice().map(actor => (
                                            <Col md={2} key={actor.id} className="mb-3">
                                                <a href={`/atoresfilmes/${actor.id}`} target="_blank" rel="noopener noreferrer">
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