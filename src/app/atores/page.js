'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Table, Image } from "react-bootstrap";

export default function Page() {

    const [atores, setAtores] = useState([])

    useEffect(() => {
        apiMovie.get('person/popular').then(resultado => {
            setAtores(resultado.data.results)
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
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {atores.map(ator => (
                        <tr key={ator.id}>
                            <td>{ator.id}</td>
                            <td>{ator.name}</td>
                            <td className="text-center">
                                <a href={`/atores/${ator.id}`} target="_blank" rel="noopener noreferrer">
                                    <Image src={`https://image.tmdb.org/t/p/w185${ator.profile_path}`} height={100} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Pagina>
    )
}
