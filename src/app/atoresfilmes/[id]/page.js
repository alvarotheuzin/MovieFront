'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Col, Image, Row } from "react-bootstrap";

export default function Page({ params }) {
    const [ator, setAtor] = useState(null);
    const [creditos, setCreditos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const actorResponse = await apiMovie.get(`person/${params.id}`);
                setAtor(actorResponse.data);

                const creditsResponse = await apiMovie.get(`person/${params.id}/tv_credits`);
                setCreditos(creditsResponse.data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if (loading) return <p>Loading...</p>;

    return (
        <Pagina titulo="Ator">
            <div style={{ marginBottom: "40px" }}></div>
            {ator && (
                <div>
                    <Row className="mt-3">
                        <h2>{ator.name}</h2>
                        <Col md={4}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${ator.profile_path}`}
                                alt={ator.name}
                                fluid
                            />
                        </Col>
                        <Col md={4}>
                            <p><b>Data de Nascimento: </b>{ator.birthday}</p>
                            <p><b>Local de Nascimento: </b>{ator.place_of_birth}</p>
                            <p><b>Popularidade: </b>{ator.popularity}</p>
                            <p><b>Biografia: </b>{ator.biography || "Nenhuma biografia disponível"}</p>
                            <a href={`/filmes/card`}>
                                <Button variant="primary">Voltar</Button>
                            </a>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <h2>Séries/Filmes em que participou</h2>
                        {creditos && creditos.cast && creditos.cast.slice().map(serie => (
                            <Col md={2} key={serie.id} className="mb-3">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w185${serie.poster_path}`}
                                    alt={serie.name}
                                    fluid
                                />
                                <p><b>{serie.name}</b></p>
                                <p>{serie.first_air_date}</p>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </Pagina>
    );
}
