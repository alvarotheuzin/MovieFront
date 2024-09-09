"use client";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Pagina(props) {

    return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="../">Sistema Acadêmico</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Filmes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/filmes">Lista</NavDropdown.Item>
              <NavDropdown.Item href="/filmes/card">Em Cartaz</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Series" id="basic-nav-dropdown">
              <NavDropdown.Item href="/series">Lista</NavDropdown.Item>
              <NavDropdown.Item href="/series/card">Em Cartaz</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/atores">Atores</Nav.Link>
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