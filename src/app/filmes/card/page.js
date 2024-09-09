'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function Page() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        apiMovie.get('movie/now_playing').then(resultado => {
            setFilmes(resultado.data.results)
        })
    }, [])

    return (
        
        <Pagina titulo="Filmes">
            <div style={{ marginBottom: "40px" }}></div>

        <h1>Filmes em Cartaz</h1>

            <Row md={3}>
                {filmes.map(item => (
                    <Col key={item.id} className="mt-3">
                        <Card>
                            <Card.Img height={270} variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.backdrop_path} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.original_title}</Card.Text>
                                <Card.Text>{item.id}</Card.Text>
                                <Card.Text>Popularidade: {item.popularity}</Card.Text>
                                <a href={`/filmes/${item.id}`}>
                                    <Button variant="danger">Ver Detalhe</Button>
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}