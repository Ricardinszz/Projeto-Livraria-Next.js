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
import FuncionarioValidator from '@/validators/FuncionarioValidator';
import { mask } from 'remask';

export default function Page({ params }) {
    const route = useRouter();
    const [funcionario, setFuncionario] = useState({ nome: '', cargo: '', salario: '', data_contratacao: '', telefone: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        const dados = funcionarios.find(item => item.id == params.id);
        if (dados) {
            setFuncionario(dados);
        }
    }, [params.id]);

    function salvar(dados) {
        const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        if (funcionario.id) {
            const index = funcionarios.findIndex(item => item.id == funcionario.id);
            funcionarios[index] = { ...funcionario, ...dados };
        } else {
            dados.id = v4();
            funcionarios.push(dados);
        }
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
        return route.push('/funcionarios');
    }

    function handleSalarioChange(e, setFieldValue) {
        const { value } = e.target;

        // Ajusta a máscara para permitir o formato desejado
        let maskedValue = mask(value, 'R$ 9.999,9');
        
        // Se o valor for menor que 1000, ajusta a máscara para um formato correto
        if (value.replace(/[^\d]/g, '').length <= 4) {
            maskedValue = mask(value, 'R$ 9.999,9');
        } else {
            maskedValue = mask(value, 'R$ 999.999,99');
        }

        setFieldValue('salario', maskedValue);
    }

    function handleTelefoneChange(e, setFieldValue) {
        const { value } = e.target;
        const maskedValue = mask(value, '(99) 99999-9999');
        setFieldValue('telefone', maskedValue);
    }

    if (!isAuthenticated) {
        return <Login onLogin={setIsAuthenticated} />; 
    }

    return (
        <>
            <Pagina titulo="Funcionário">
                <Formik
                    initialValues={funcionario}
                    validationSchema={FuncionarioValidator}
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
                            <Form.Group className="mb-3" controlId="cargo">
                                <Form.Label>Cargo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cargo"
                                    value={values.cargo}
                                    onChange={handleChange('cargo')}
                                    isInvalid={touched.cargo && !!errors.cargo}
                                />
                                {touched.cargo && errors.cargo && (
                                    <div className="invalid-feedback d-block">
                                        {errors.cargo}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="salario">
                                <Form.Label>Salário</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="salario"
                                    value={values.salario}
                                    onChange={(e) => handleSalarioChange(e, setFieldValue)}
                                    isInvalid={touched.salario && !!errors.salario}
                                />
                                {touched.salario && errors.salario && (
                                    <div className="invalid-feedback d-block">
                                        {errors.salario}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="data_contratacao">
                                <Form.Label>Data de Contratação</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="data_contratacao"
                                    value={values.data_contratacao}
                                    onChange={handleChange('data_contratacao')}
                                    isInvalid={touched.data_contratacao && !!errors.data_contratacao}
                                />
                                {touched.data_contratacao && errors.data_contratacao && (
                                    <div className="invalid-feedback d-block">
                                        {errors.data_contratacao}
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
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/funcionarios" className="btn btn-danger ms-2">
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
