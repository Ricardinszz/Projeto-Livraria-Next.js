'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import Login from "../components/login";
import Rodape from "../components/rodape";

export default function Page() {
    const [autores, setAutores] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setAutores(JSON.parse(localStorage.getItem('autores')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = autores.filter(item => item.id != id);
            localStorage.setItem('autores', JSON.stringify(dados));
            setAutores(dados);
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <Pagina titulo="Autores" semFaixa={true}>
                    <Link href="/autores/form" className="btn btn-primary mb-3">
                        <FaPlusCircle /> Novo
                    </Link>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Contato Principal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {autores.map((item, i) => (
                                <tr key={item.id}>
                                    <td>
                                        <Link href={`/autores/form/${item.id}`}>
                                            <FaRegEdit title="Editar" className="text-primary" />
                                        </Link>
                                        <MdDelete
                                            title="Excluir"
                                            className="text-danger"
                                            onClick={() => excluir(item.id)}
                                        />
                                    </td>
                                    <td>{item.nome}</td>
                                    <td>{item.endereco}</td>
                                    <td>{item.telefone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contato_principal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Pagina>
            ) : (
                <Login onLogin={setIsAuthenticated} />
            )}
            <Rodape />
        </>
    );
}
