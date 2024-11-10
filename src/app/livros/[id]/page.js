'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";
import Pagina from "../../components/Pagina";
import Rodape from '../../components/rodape';

export default function LivroDetalhes() {
    const { id } = useParams();
    const [livro, setLivro] = useState(null);
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const livrosData = JSON.parse(localStorage.getItem('livros')) || [];
        setLivros(livrosData);
        if (id) {
            const livroEncontrado = livrosData.find(item => item.id == id);
            setLivro(livroEncontrado);
        }
    }, [id]);

    if (!livro) return <div>Carregando...</div>;

    return (
        <Pagina titulo={`Detalhes do ${livro.titulo}`} semFaixa={true}>
            <Row>
                <Col md={6}>
                    {livro.capa ? (
                        <img
                            className="d-block w-100"
                            src={livro.capa}
                            alt={`Capa do ${livro.titulo}`}
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                    ) : (
                        <div>Sem capa disponível</div>
                    )}
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{livro.titulo}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Autor: {livro.autor}</Card.Subtitle>
                            <Card.Text>
                                <strong>Editora:</strong> {livro.editora}<br />
                                <strong>Número de Páginas:</strong> {livro.numeroPaginas}<br />
                                <strong>Preço:</strong> {livro.preco}
                            </Card.Text>
                            <Button variant="primary" onClick={() => window.history.back()}>Voltar</Button>
                            <Link href={`/vendas/form?id=${livro.id}&titulo=${livro.titulo}&ano=${livro.anoPublicacao}&valor=${livro.preco}`}>
                                <Button variant="success" className="ms-2">Comprar</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Descrição Completa</Card.Title>
                    <Card.Text>
                        <strong>Título:</strong> {livro.titulo}<br />
                        <strong>Autor:</strong> {livro.autor}<br />
                        <strong>Gênero:</strong> {livro.genero}<br />
                        <strong>Ano de Publicação:</strong> {livro.anoPublicacao}<br />
                        <strong>Editora:</strong> {livro.editora}<br />
                        <strong>Resumo:</strong> {livro.resumo}<br />
                        <strong>Número de Páginas:</strong> {livro.numeroPaginas}<br />
                        <strong>Idioma:</strong> {livro.idioma}<br />
                        <strong>Preço:</strong> {livro.preco}
                    </Card.Text>
                </Card.Body>
            </Card>
            <h3 className="mt-5">Outros Livros</h3>
            <Row className="mb-5">
                {livros.map((item, index) => (
                    <Col key={index} sm={12} md={4} lg={3} className="mb-4">
                        <Link href={`/livros/${item.id}`}>
                            <Card>
                                <Card.Img variant="top" src={item.capa} style={{ height: '150px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{item.titulo}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Autor: {item.autor}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Editora:</strong> {item.editora}<br />
                                        <strong>Número de Páginas:</strong> {item.numeroPaginas}<br />
                                        <strong>Preço:</strong> {item.preco}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Rodape />
        </Pagina>
    );
}
