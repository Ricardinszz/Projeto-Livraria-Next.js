'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineArrowBack } from 'react-icons/md';
import Pagina from "@/app/components/Pagina";
import { v4 } from 'uuid';
import ClienteValidator from '@/validators/ClienteValidator';
import { mask } from 'remask';

export default function FormCliente({ params }) {
    const route = useRouter();
    const [cliente, setCliente] = useState({ nome: '', email: '', telefone: '', endereco: '', status: '' });

    useEffect(() => {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const dados = clientes.find(item => item.id == params.id);
        if (dados) {
            setCliente(dados);
        }
    }, [params.id]);

    function salvar(dados) {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        if (cliente.id) {
            const index = clientes.findIndex(item => item.id == cliente.id);
            clientes[index] = { ...cliente, ...dados };
        } else {
            dados.id = v4();
            clientes.push(dados);
        }
        localStorage.setItem('clientes', JSON.stringify(clientes));
        return route.push('/clientes');
    }

    function handleTelefoneChange(e, setFieldValue) {
        const { value } = e.target;
        const maskedValue = mask(value, '(99) 99999-9999');
        setFieldValue('telefone', maskedValue);
    }

    return (
        <Pagina titulo="Cadastro de Cliente" semFaixa={true}>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Row>
                    <Col>
                        <Formik
                            initialValues={cliente}
                            validationSchema={ClienteValidator}
                            enableReinitialize
                            onSubmit={values => salvar(values)}
                        >
                            {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="nome">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={values.nome}
                                            onChange={handleChange('nome')}
                                            isInvalid={touched.nome && !!errors.nome}
                                            required
                                        />
                                        {touched.nome && errors.nome && (
                                            <div className="invalid-feedback d-block">
                                                {errors.nome}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange('email')}
                                            isInvalid={touched.email && !!errors.email}
                                            required
                                        />
                                        {touched.email && errors.email && (
                                            <div className="invalid-feedback d-block">
                                                {errors.email}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId="telefone">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="telefone"
                                            value={values.telefone}
                                            onChange={(e) => handleTelefoneChange(e, setFieldValue)}
                                            isInvalid={touched.telefone && !!errors.telefone}
                                            required
                                        />
                                        {touched.telefone && errors.telefone && (
                                            <div className="invalid-feedback d-block">
                                                {errors.telefone}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId="endereco">
                                        <Form.Label>Endereço</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="endereco"
                                            value={values.endereco}
                                            onChange={handleChange('endereco')}
                                            isInvalid={touched.endereco && !!errors.endereco}
                                            required
                                        />
                                        {touched.endereco && errors.endereco && (
                                            <div className="invalid-feedback d-block">
                                                {errors.endereco}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId="status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange('status')}
                                            isInvalid={touched.status && !!errors.status}
                                            required
                                        >
                                            <option value="">Selecione</option>
                                            <option value="Ativo">Ativo</option>
                                            <option value="Inativo">Inativo</option>
                                        </Form.Select>
                                        {touched.status && errors.status && (
                                            <div className="invalid-feedback d-block">
                                                {errors.status}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <div className="mt-3 d-flex justify-content-between">
                                        <Button variant="dark" type="submit" className="me-2" style={{ flex: 1 }}>
                                            <FaCheck /> Criar
                                        </Button>
                                        <Button variant="secondary" onClick={() => route.push('/clientes')} style={{ flex: 1, backgroundColor: '#6c757d', borderColor: '#6c757d' }}>
                                            <MdOutlineArrowBack /> Sair
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
