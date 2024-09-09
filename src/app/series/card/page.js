'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function Page() {

    const [series, setSeries] = useState([])

    useEffect(() => {
        apiMovie.get('tv/top_rated').then(resultado => {
            setSeries(resultado.data.results)
        })
    }, [])

    return (
        
        <Pagina titulo="Series">
            <div style={{ marginBottom: "40px" }}></div>

        <h1>Series</h1>

            <Row md={3}>
                {series.map(item => (
                    <Col key={item.id} className="mt-3">
                        <Card>
                            <Card.Img height={270} variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.backdrop_path} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.original_name}</Card.Text>
                                <Card.Text>{item.id}</Card.Text>
                                <Card.Text>Popularidade: {item.popularity}</Card.Text>
                                <a href={`/series/${item.id}`}>
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