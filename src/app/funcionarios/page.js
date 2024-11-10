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
    const [funcionarios, setFuncionarios] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setFuncionarios(JSON.parse(localStorage.getItem('funcionarios')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = funcionarios.filter(item => item.id != id);
            localStorage.setItem('funcionarios', JSON.stringify(dados));
            setFuncionarios(dados);
        }
    }

    function formatarData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <>
            {isAuthenticated ? (
                <Pagina titulo="Funcionários" semFaixa={true}>
                    <Link href="/funcionarios/form" className="btn btn-primary mb-3">
                        <FaPlusCircle /> Novo
                    </Link>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Cargo</th>
                                <th>Salário</th>
                                <th>Data Contratação</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funcionarios.map((item, i) => (
                                <tr key={item.id}>
                                    <td>
                                        <Link href={`/funcionarios/form/${item.id}`}>
                                            <FaRegEdit title="Editar" className="text-primary" />
                                        </Link>
                                        <MdDelete
                                            title="Excluir"
                                            className="text-danger"
                                            onClick={() => excluir(item.id)}
                                        />
                                    </td>
                                    <td>{item.nome}</td>
                                    <td>{item.cargo}</td>
                                    <td>{item.salario}</td>
                                    <td>{formatarData(item.data_contratacao)}</td>
                                    <td>{item.telefone}</td>
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
