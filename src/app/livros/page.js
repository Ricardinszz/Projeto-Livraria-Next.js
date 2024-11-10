'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import Rodape from '../components/rodape';

export default function Page() {
    const [livros, setLivros] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [filtroIdioma, setFiltroIdioma] = useState('');
    const [filtroGenero, setFiltroGenero] = useState('');
    const [pesquisa, setPesquisa] = useState('');

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

    // Função para filtrar os livros com base nos filtros selecionados e na pesquisa
    const livrosFiltrados = livros.filter(livro => {
        return (
            (filtroIdioma === '' || livro.idioma === filtroIdioma) &&
            (filtroGenero === '' || livro.genero === filtroGenero) &&
            (pesquisa === '' || livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()))
        );
    });

    return (
        <Pagina titulo="Livros" semFaixa={true}>
            {isAdmin && (
                <Link href="/livros/form" className="btn btn-primary mb-3">
                    <FaPlusCircle /> Criar Anúncio
                </Link>
            )}
            {/* Filtros de Idioma, Gênero e Barra de Pesquisa */}
            <Form className="mb-4">
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="filtroIdioma">
                            <Form.Label>Filtrar por Idioma</Form.Label>
                            <Form.Select value={filtroIdioma} onChange={(e) => setFiltroIdioma(e.target.value)}>
                                <option value="">Todos os Idiomas</option>
                                <option value="Português">Português</option>
                                <option value="Inglês">Inglês</option>
                                <option value="Espanhol">Espanhol</option>
                                <option value="Francês">Francês</option>
                                <option value="Alemão">Alemão</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="filtroGenero">
                            <Form.Label>Filtrar por Gênero</Form.Label>
                            <Form.Select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)}>
                                <option value="">Todos os Gêneros</option>
                                <option value="Ficção Científica">Ficção Científica</option>
                                <option value="Fantasia">Fantasia</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistério e Suspense">Mistério e Suspense</option>
                                <option value="Horror">Horror</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Biografia e Autobiografia">Biografia e Autobiografia</option>
                                <option value="Histórico">Histórico</option>
                                <option value="Jovem Adulto (YA)">Jovem Adulto (YA)</option>
                                <option value="Autoajuda e Desenvolvimento Pessoal">Autoajuda e Desenvolvimento Pessoal</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="pesquisa">
                            <Form.Label>Pesquisar por Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o título do livro"
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row>
                {livrosFiltrados.map((item, i) => (
                    <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            {item.capa && <Card.Img variant="top" src={item.capa} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                            <Card.Body>
                                <Card.Title>{item.titulo}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Autor: {item.autor}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Gênero:</strong> {item.genero}<br />
                                    <strong>Número de Páginas:</strong> {item.numeroPaginas}
                                </Card.Text>
                                {!isLivroVendido(item.id) ? (
                                    <Link href={`/livros/${item.id}`} className="btn btn-dark text-white me-2">
                                        Ver Detalhes
                                    </Link>
                                ) : (
                                    <Button variant="secondary" className="me-2" disabled>
                                        Esgotado
                                    </Button>
                                )}
                                {isAdmin && (
                                    <>
                                        <Link href={`/livros/form/${item.id}`} className="btn btn-primary me-2">
                                            <FaRegEdit title="Editar" />
                                        </Link>
                                        <Button variant="danger" onClick={() => excluir(item.id)}>
                                            <MdDelete title="Excluir" />
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Rodape />
        </Pagina>
    );
}
