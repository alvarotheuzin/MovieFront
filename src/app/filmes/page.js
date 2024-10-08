'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Table, Image } from "react-bootstrap";

export default function Page() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        apiMovie.get('movie/now_playing').then(resultado => {
            setFilmes(resultado.data.results)
        })
    }, [])

    return (
        <Pagina titulo="Atores Populares">
            <div style={{ marginBottom: "40px" }}></div>

            <Table className="mt-3" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {filmes.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}
