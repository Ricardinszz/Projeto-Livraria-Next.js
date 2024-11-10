'use client';

import { useState, useEffect } from 'react';
import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import Login from '@/app/components/login'; 
import Rodape from '@/app/components/rodape';
import AutorValidator from '@/validators/AutorValidator';
import { mask } from 'remask';

export default function Page({ params }) {
    const route = useRouter();
    const [autor, setAutor] = useState({ nome: '', endereco: '', telefone: '', email: '', contato_principal: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        const autores = JSON.parse(localStorage.getItem('autores')) || [];
        const dados = autores.find(item => item.id == params.id);
        if (dados) {
            setAutor(dados);
        }
    }, [params.id]);

    function salvar(dados) {
        const autores = JSON.parse(localStorage.getItem('autores')) || [];
        if (autor.id) {
            const index = autores.findIndex(item => item.id == autor.id);
            autores[index] = { ...autor, ...dados };
        } else {
            dados.id = v4();
            autores.push(dados);
        }
        localStorage.setItem('autores', JSON.stringify(autores));
        return route.push('/autores');
    }

    function handleTelefoneChange(e, setFieldValue) {
        const { value } = e.target;
        const maskedValue = mask(value, '(99) 99999-9999');
        setFieldValue('telefone', maskedValue);
    }

    function handleContatoPrincipalChange(e, setFieldValue) {
        const { value } = e.target;
        const maskedValue = mask(value, '(99) 99999-9999');
        setFieldValue('contato_principal', maskedValue);
    }

    if (!isAuthenticated) {
        return <Login onLogin={setIsAuthenticated} />; 
    }

    return (
        <>
            <Pagina titulo="Autor">
                <Formik
                    initialValues={autor}
                    validationSchema={AutorValidator}
                    enableReinitialize
                    onSubmit={values => salvar(values)}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                    isInvalid={touched.nome && !!errors.nome}
                                />
                                {touched.nome && errors.nome && (
                                    <div className="invalid-feedback d-block">
                                        {errors.nome}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="endereco">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="endereco"
                                    value={values.endereco}
                                    onChange={handleChange('endereco')}
                                    isInvalid={touched.endereco && !!errors.endereco}
                                />
                                {touched.endereco && errors.endereco && (
                                    <div className="invalid-feedback d-block">
                                        {errors.endereco}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(e) => handleTelefoneChange(e, setFieldValue)}
                                    isInvalid={touched.telefone && !!errors.telefone}
                                />
                                {touched.telefone && errors.telefone && (
                                    <div className="invalid-feedback d-block">
                                        {errors.telefone}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    isInvalid={touched.email && !!errors.email}
                                />
                                {touched.email && errors.email && (
                                    <div className="invalid-feedback d-block">
                                        {errors.email}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="contato_principal">
                                <Form.Label>Contato Principal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contato_principal"
                                    value={values.contato_principal}
                                    onChange={(e) => handleContatoPrincipalChange(e, setFieldValue)}
                                    isInvalid={touched.contato_principal && !!errors.contato_principal}
                                />
                                {touched.contato_principal && errors.contato_principal && (
                                    <div className="invalid-feedback d-block">
                                        {errors.contato_principal}
                                    </div>
                                )}
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/autores" className="btn btn-danger ms-2">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Pagina>
            <Rodape />
        </>
    );
}
