'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, Row, Col, Container, Carousel, Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from './components/Pagina';
import Rodape from './components/rodape';

const LivroImageCarousel = ({ images, altTexts }) => (
    <Carousel style={{ height: '400px', width: '100%' }}>
        {images.map((image, index) => (
            <Carousel.Item key={index}>
                <img
                    className="d-block w-100"
                    src={image}
                    alt={altTexts[index]}
                    style={{ height: '400px', objectFit: 'cover', width: '100%' }}
                />
                <Carousel.Caption>
                    <h3>{altTexts[index]}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
);

export default function Page() {
    const [livros, setLivros] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setLivros(JSON.parse(localStorage.getItem('livros')) || []);
        setVendas(JSON.parse(localStorage.getItem('vendas')) || []);
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        setIsAdmin(isAuthenticated === 'true');
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = livros.filter(item => item.id != id);
            localStorage.setItem('livros', JSON.stringify(dados));
            setLivros(dados);
        }
    }

    function isLivroVendido(id) {
        return vendas.some(venda => venda.id_livro === id);
    }

    return (
        <Pagina titulo="Livros" semFaixa={true}>
            <Container>
                <LivroImageCarousel 
                    images={livros.map(livro => livro.capa)} 
                    altTexts={livros.map(livro => livro.titulo)} 
                />
                <Row className="mt-4">
                    {livros.map((livro, index) => (
                        <Col key={livro.id} sm={12} md={6} lg={3} className="mb-4">
                            <Card style={{ height: '350px' }}>
                                {livro.capa && <Card.Img variant="top" src={livro.capa} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
                                <Card.Body>
                                    <Card.Title>{livro.titulo}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Autor: {livro.autor}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Gênero:</strong> {livro.genero}<br />
                                        <strong>Número de Páginas:</strong> {livro.numeroPaginas}
                                    </Card.Text>
                                    {!isLivroVendido(livro.id) ? (
                                        <Link href={`/livros/${livro.id}`} className="btn btn-dark text-white me-2">
                                            Ver Detalhes
                                        </Link>
                                    ) : (
                                        <Button variant="secondary" className="me-2" disabled>
                                            Esgotado
                                        </Button>
                                    )}
                                    {isAdmin && (
                                        <>
                                            <Link href={`/livros/form/${livro.id}`} className="btn btn-primary me-2">
                                                <FaRegEdit title="Editar" />
                                            </Link>
                                            <Button variant="danger" onClick={() => excluir(livro.id)}>
                                                <MdDelete title="Excluir" />
                                            </Button>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="mb-5"></div>
            </Container>
            <Rodape />
        </Pagina>
    );
}
