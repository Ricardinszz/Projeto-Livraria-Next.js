'use client';

import { useState, useEffect } from 'react';
import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Modal, Card, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { mask, unMask } from 'remask';
import Rodape from '@/app/components/rodape';
import VendaValidator from '@/validators/VendaValidator';

function handleValorChange(e, setFieldValue) {
    const { value } = e.target;
    const maskedValue = mask(unMask(value), ['R$ 999.999.999,99']);
    setFieldValue('valor_venda', maskedValue);
}

export default function Page({ params }) {
    const route = useRouter();
    const searchParams = useSearchParams();
    const [venda, setVenda] = useState({ id_livro: '', id_cliente: '', id_funcionario: '', data_venda: '', valor_venda: '', forma_pagamento: '' });
    const [livros, setLivros] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        const dados = vendas.find(item => item.id == params.id);
        if (dados) {
            setVenda(dados);
        } else {
            const id = searchParams.get('id');
            const titulo = searchParams.get('titulo');
            const ano = searchParams.get('ano');
            const valor = searchParams.get('valor');
            if (id && titulo && ano && valor) {
                setVenda({ ...venda, id_livro: id, titulo, ano, valor_venda: valor });
            }
        }

        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        setLivros(livros);

        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        setClientes(clientes);

        const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        setFuncionarios(funcionarios);
    }, [params.id, searchParams]);

    function salvar(dados) {
        const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        if (venda.id) {
            const index = vendas.findIndex(item => item.id == venda.id);
            vendas[index] = { ...venda, ...dados };
        } else {
            dados.id = v4();
            vendas.push(dados);
        }
        localStorage.setItem('vendas', JSON.stringify(vendas));
        setShowModal(true);
    }

    function handleClose() {
        setShowModal(false);
        route.push('/');
    }

    return (
        <>
            <Pagina titulo="Confirme sua compra!" >
                <Row>
                    <Col md={8}>
                        <Formik
                            initialValues={venda}
                            validationSchema={VendaValidator}
                            enableReinitialize
                            onSubmit={values => salvar(values)}
                        >
                            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="id_cliente">
                                        <Form.Label>Cliente</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="id_cliente"
                                            value={values.id_cliente}
                                            onChange={handleChange('id_cliente')}
                                            isInvalid={touched.id_cliente && !!errors.id_cliente}
                                        >
                                            <option value="">Selecione um cliente</option>
                                            {clientes.map(cliente => (
                                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                            ))}
                                        </Form.Control>
                                        {touched.id_cliente && errors.id_cliente && (
                                            <div className="invalid-feedback d-block">
                                                {errors.id_cliente}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="titulo">
                                        <Form.Label>Livro</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="titulo"
                                            value={values.titulo}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="ano">
                                        <Form.Label>Ano</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ano"
                                            value={values.ano}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="valor_venda">
                                        <Form.Label>Valor Venda</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="valor_venda"
                                            value={values.valor_venda}
                                            onChange={(e) => handleValorChange(e, setFieldValue)}
                                            isInvalid={touched.valor_venda && !!errors.valor_venda}
                                        />
                                        {touched.valor_venda && errors.valor_venda && (
                                            <div className="invalid-feedback d-block">
                                                {errors.valor_venda}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="forma_pagamento">
                                        <Form.Label>Forma Pagamento</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="forma_pagamento"
                                            value={values.forma_pagamento}
                                            onChange={handleChange('forma_pagamento')}
                                            isInvalid={touched.forma_pagamento && !!errors.forma_pagamento}
                                        >
                                            <option value="">Selecione uma forma de pagamento</option>
                                            <option value="dinheiro">Dinheiro</option>
                                            <option value="debito">Débito</option>
                                            <option value="credito">Crédito</option>
                                            <option value="pix">Pix</option>
                                        </Form.Control>
                                        {touched.forma_pagamento && errors.forma_pagamento && (
                                            <div className="invalid-feedback d-block">
                                                {errors.forma_pagamento}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <div className="d-none">
                                        <Button type="submit" id="hiddenSubmitButton">Submit</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Resumo da Compra</Card.Title>
                                <Card.Text>
                                    <strong>Valor:</strong> {venda.valor_venda}
                                </Card.Text>
                                <Button onClick={() => document.getElementById('hiddenSubmitButton').click()} variant="success" className="w-100 mb-2">
                                    <FaCheck /> Confirmar Compra
                                </Button>
                                <Link href="/livros" className="btn btn-secondary w-100">
                                    <MdOutlineArrowBack /> Cancelar
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Pagina>
            <Rodape />

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Compra Bem-Sucedida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    A compra foi realizada com sucesso!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
