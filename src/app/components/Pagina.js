'use client';

import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaBook, FaMapMarkerAlt, FaSignInAlt } from "react-icons/fa";

export default function Pagina(props) {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <FaBook className="me-2" /> 
                        Livraria
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/livros" className="nav-link-custom">Livros</Nav.Link>
                            <Nav.Link href="/clientes" className="nav-link-custom">Clientes</Nav.Link>
                            <NavDropdown title="Mais" id="nav-dropdown-mais" className="nav-link-custom">
                                <NavDropdown.Item href="/funcionarios">Funcionários</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/autores">Autores</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/vendas">Vendas</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/localizacao" className="nav-link-custom">
                                <FaMapMarkerAlt title="Localização" />
                            </Nav.Link>
                            <Nav.Link href="/login" className="nav-link-custom">
                                <FaSignInAlt title="Login" />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {!props.semFaixa && (
                <div className="bg-secondary text-white text-center p-2"> 
                    <h1>{props.titulo}</h1>
                </div>
            )}

            <Container>
                {props.children}
            </Container>

            <style jsx>{`
                .navbar-dark .navbar-brand {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .navbar-dark .nav-link-custom {
                    font-size: 1.1rem;
                    margin-right: 1rem;
                }

                .navbar-dark .nav-dropdown {
                    font-size: 1.1rem;
                }

                .bg-secondary {
                    padding: 0.5rem 0;
                }
            `}</style>
        </>
    );
}
