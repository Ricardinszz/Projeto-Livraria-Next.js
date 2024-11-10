'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Pagina from "../components/Pagina";
import Login from "../components/login";
import Rodape from "../components/rodape";

// Registre as escalas e elementos necessários
Chart.register(CategoryScale, LinearScale, BarElement);

// Função para gerar cores aleatórias
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default function Page() {
    const [vendas, setVendas] = useState([]);
    const [livros, setLivros] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setVendas(JSON.parse(localStorage.getItem('vendas')) || []);
        setLivros(JSON.parse(localStorage.getItem('livros')) || []);
        setClientes(JSON.parse(localStorage.getItem('clientes')) || []);
        setFuncionarios(JSON.parse(localStorage.getItem('funcionarios')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = vendas.filter(item => item.id != id);
            localStorage.setItem('vendas', JSON.stringify(dados));
            setVendas(dados);
        }
    }

    function getNomeById(id, lista) {
        const item = lista.find(item => item.id === id);
        return item ? item.nome || item.titulo : 'Desconhecido';
    }

    function formatarData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    const clientData = clientes.map(cliente => {
        const clientVendas = vendas.filter(venda => venda.id_cliente === cliente.id);
        if (clientVendas.length === 0) return null;
        const totalSpent = clientVendas.reduce((total, venda) => total + venda.valor_venda, 0);
        return {
            nome: cliente.nome,
            numCompras: clientVendas.length,
            totalGasto: totalSpent,
            color: getRandomColor()
        };
    }).filter(cliente => cliente !== null);

    const data = {
        labels: clientData.map(cliente => cliente.nome),
        datasets: [
            {
                label: 'Número de Compras',
                data: clientData.map(cliente => cliente.numCompras),
                backgroundColor: clientData.map(cliente => cliente.color),
                borderColor: clientData.map(cliente => cliente.color),
                borderWidth: 1,
            },
            {
                label: 'Valor Total Gasto',
                data: clientData.map(cliente => cliente.totalGasto),
                backgroundColor: clientData.map(cliente => cliente.color),
                borderColor: clientData.map(cliente => cliente.color),
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            {isAuthenticated ? (
                <Pagina titulo="Vendas" semFaixa={true}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Livro</th>
                                <th>Cliente</th>
                                <th>Valor Venda</th>
                                <th>Forma Pagamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map((item, i) => (
                                <tr key={item.id}>
                                    <td>
                                        <Link href={`/vendas/form/${item.id}`}>
                                            <FaRegEdit title="Editar" className="text-primary" />
                                        </Link>
                                        <MdDelete
                                            title="Excluir"
                                            className="text-danger"
                                            onClick={() => excluir(item.id)}
                                        />
                                    </td>
                                    <td>{getNomeById(item.id_livro, livros)}</td>
                                    <td>{getNomeById(item.id_cliente, clientes)}</td>
                                    <td>{item.valor_venda}</td>
                                    <td>{item.forma_pagamento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {vendas.length > 0 && clientData.length > 0 && (
                        <div style={{ width: '80%', margin: '0 auto' }}>
                            <Bar data={data} />
                        </div>
                    )}
                </Pagina>
            ) : (
                <Login onLogin={setIsAuthenticated} />
            )}
            <Rodape />
        </>
    );
}
