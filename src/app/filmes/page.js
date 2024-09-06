'use client'

import Pagina from "../components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "../services/apiMovies";
import { Card, Col, Row } from "react-bootstrap";

export default function Page() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        apiMovie.get('movie/popular').then(resultado => {
            setFilmes(resultado.data.results)
        })
    }, [])

    return (


        <Pagina titulo='Filmes'>
            <div style={{ marginBottom: "40px" }}></div>

            <Row md={3}>
                {filmes.map((item) => (
                    <Col key={item.id} className="mb-4">
                        <Card>
                            <Card.Img height={250} variant="top" src={'https://image.tmdb.org/t/p/w500'+ item.backdrop_path} style={{ width: '100%', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {filmes.map(item => (
                <p>{item.title}</p>
            ))}

        </Pagina>

    )
}
