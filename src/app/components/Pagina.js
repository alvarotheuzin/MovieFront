"use client";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import apiMovie from "../services/apiMovies";

export default function Pagina(props) {

    return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="../">Sistema Acadêmico</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/fundamentos">Filmes</Nav.Link>
            <Nav.Link href="/clientes">Séries</Nav.Link>
            <Nav.Link href="/array">Atores</Nav.Link>
            <NavDropdown title="Filmes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/disney">Populares</NavDropdown.Item>
              <NavDropdown.Item href="/disney/cards">Em Cartaz</NavDropdown.Item>
              <NavDropdown.Item href="/disney/carrossel">Carrossel</NavDropdown.Item>
              <NavDropdown.Item href="/disney/tabela">Tabela</NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <div className="bg-secondary text-white text-center p-3">
        <h1>{props.titulo}</h1>
      </div>

      <Container>{props.children}</Container>
    </>
  );
}