'use client';

import { useState, useEffect } from 'react';
import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Image } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import Rodape from '@/app/components/rodape';
import LivroValidator from '@/validators/LivroValidator';

export default function Page({ params }) {
    const route = useRouter();
    const [livro, setLivro] = useState({ titulo: '', autor: '', genero: '', anoPublicacao: '', editora: '', resumo: '', numeroPaginas: '', idioma: '', capa: '', preco: '' });
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        const dados = livros.find(item => item.id == params.id);
        if (dados) {
            setLivro(dados);
        }
    }, [params.id]);

    useEffect(() => {
        const autores = JSON.parse(localStorage.getItem('autores')) || [];
        setAutores(autores);
    }, []);

    function salvar(dados) {
        const livros = JSON.parse(localStorage.getItem('livros')) || [];

        const livroDados = {
            ...dados
        };

        if (livro.id) {
            const index = livros.findIndex(item => item.id == livro.id);
            livros[index] = { ...livro, ...livroDados };
        } else {
            livroDados.id = v4();
            livros.push(livroDados);
        }
        localStorage.setItem('livros', JSON.stringify(livros));
        return route.push('/livros');
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(30), (val, index) => currentYear - index);

    const formatCurrency = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue / 100);
        return formattedValue;
    };

    const idiomas = ['Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão'];
    const generos = [
        'Ficção Científica', 'Fantasia', 'Romance', 'Mistério e Suspense', 'Horror', 'Thriller', 
        'Biografia e Autobiografia', 'Histórico', 'Jovem Adulto (YA)', 'Autoajuda e Desenvolvimento Pessoal'
    ];

    return (
        <>
            <Pagina titulo="Livro" semFaixa={true}>
                <div style={{ paddingBottom: '80px' }}>
                    <Formik
                        initialValues={livro}
                        validationSchema={LivroValidator}
                        enableReinitialize
                        onSubmit={values => salvar(values)}
                    >
                        {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
                            <Form>
                                <Form.Group className="mb-3" controlId="titulo">
                                    <Form.Label>Título do Livro</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="titulo"
                                        value={values.titulo}
                                        onChange={handleChange('titulo')}
                                        isInvalid={touched.titulo && !!errors.titulo}
                                    />
                                    {touched.titulo && errors.titulo && (
                                        <div className="invalid-feedback d-block">
                                            {errors.titulo}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="autor">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Select
                                        name="autor"
                                        value={values.autor}
                                        onChange={handleChange('autor')}
                                        isInvalid={touched.autor && !!errors.autor}
                                    >
                                        <option value="">Selecione o autor</option>
                                        {autores.map(autor => (
                                            <option key={autor.id} value={autor.nome}>{autor.nome}</option>
                                        ))}
                                    </Form.Select>
                                    {touched.autor && errors.autor && (
                                        <div className="invalid-feedback d-block">
                                            {errors.autor}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="genero">
                                    <Form.Label>Gênero</Form.Label>
                                    <Form.Select
                                        name="genero"
                                        value={values.genero}
                                        onChange={handleChange('genero')}
                                        isInvalid={touched.genero && !!errors.genero}
                                    >
                                        <option value="">Selecione o gênero</option>
                                        {generos.map(genero => (
                                            <option key={genero} value={genero}>{genero}</option>
                                        ))}
                                    </Form.Select>
                                    {touched.genero && errors.genero && (
                                        <div className="invalid-feedback d-block">
                                            {errors.genero}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="anoPublicacao">
                                    <Form.Label>Ano de Publicação</Form.Label>
                                    <Form.Select
                                        name="anoPublicacao"
                                        value={values.anoPublicacao}
                                        onChange={handleChange('anoPublicacao')}
                                        isInvalid={touched.anoPublicacao && !!errors.anoPublicacao}
                                    >
                                        <option value="">Selecione o ano</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </Form.Select>
                                    {touched.anoPublicacao && errors.anoPublicacao && (
                                        <div className="invalid-feedback d-block">
                                            {errors.anoPublicacao}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="editora">
                                    <Form.Label>Editora</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="editora"
                                        value={values.editora}
                                        onChange={handleChange('editora')}
                                        isInvalid={touched.editora && !!errors.editora}
                                    />
                                    {touched.editora && errors.editora && (
                                        <div className="invalid-feedback d-block">
                                            {errors.editora}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="resumo">
                                    <Form.Label>Resumo</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="resumo"
                                        value={values.resumo}
                                        onChange={handleChange('resumo')}
                                        isInvalid={touched.resumo && !!errors.resumo}
                                    />
                                    {touched.resumo && errors.resumo && (
                                        <div className="invalid-feedback d-block">
                                            {errors.resumo}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="numeroPaginas">
                                    <Form.Label>Número de Páginas</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="numeroPaginas"
                                        value={values.numeroPaginas}
                                        onChange={handleChange('numeroPaginas')}
                                        isInvalid={touched.numeroPaginas && !!errors.numeroPaginas}
                                    />
                                    {touched.numeroPaginas && errors.numeroPaginas && (
                                        <div className="invalid-feedback d-block">
                                            {errors.numeroPaginas}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="idioma">
                                    <Form.Label>Idioma</Form.Label>
                                    <Form.Select
                                        name="idioma"
                                        value={values.idioma}
                                        onChange={handleChange('idioma')}
                                        isInvalid={touched.idioma && !!errors.idioma}
                                    >
                                        <option value="">Selecione o idioma</option>
                                        {idiomas.map(idioma => (
                                            <option key={idioma} value={idioma}>{idioma}</option>
                                        ))}
                                    </Form.Select>
                                    {touched.idioma && errors.idioma && (
                                        <div className="invalid-feedback d-block">
                                            {errors.idioma}
                                        </div>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="capa">
                                    <Form.Label>Capa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="capa"
                                        value={values.capa}
                                        onChange={handleChange('capa')}
                                        isInvalid={touched.capa && !!errors.capa}
                                    />
                                    {touched.capa && errors.capa && (
                                        <div className="invalid-feedback d-block">
                                            {errors.capa}
                                        </div>
                                    )}
                                    {values.capa && <Image src={values.capa} thumbnail className="mt-3" style={{ width: '500px', height: '500px', objectFit: 'cover' }} />}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="preco">
                                    <Form.Label>Preço</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="preco"
                                        value={values.preco}
                                        onChange={(e) => {
                                            const formattedValue = formatCurrency(e.target.value);
                                            setFieldValue('preco', formattedValue);
                                        }}
                                        isInvalid={touched.preco && !!errors.preco}
                                    />
                                    {touched.preco && errors.preco && (
                                        <div className="invalid-feedback d-block">
                                            {errors.preco}
                                        </div>
                                    )}
                                </Form.Group>
                                <div className="text-center">
                                    <Button onClick={handleSubmit} variant="success">
                                        <FaCheck /> Salvar
                                    </Button>
                                    <Link href="/livros" className="btn btn-danger ms-2">
                                        <MdOutlineArrowBack /> Voltar
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Pagina>
            <Rodape />
        </>
    );
}
