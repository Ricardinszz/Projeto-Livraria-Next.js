'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import Rodape from '../components/rodape';


export default function Page() {
    const [clientes, setClientes] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setClientes(JSON.parse(localStorage.getItem('clientes')) || []);
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        setIsAdmin(isAuthenticated === 'true');
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = clientes.filter(item => item.id != id);
            localStorage.setItem('clientes', JSON.stringify(dados));
            setClientes(dados);
        }
    }

    return (
        <Pagina titulo="Clientes" semFaixa={true}>
            <Link href="/clientes/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Cadastrar-se
            </Link>
            <Row>
                {clientes.map((item, i) => (
                    <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            {item.foto && <Card.Img variant="top" src={item.foto} />}
                            <Card.Body>
                                <Card.Title>{item.nome}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.email}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Telefone:</strong> {item.telefone}<br />
                                    <strong>Endereço:</strong> {item.endereco}<br />
                                    <strong>Status:</strong> {item.status}
                                </Card.Text>
                                {isAdmin && (
                                    <>
                                        <Link href={`/clientes/form/${item.id}`} className="btn btn-primary me-2">
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
