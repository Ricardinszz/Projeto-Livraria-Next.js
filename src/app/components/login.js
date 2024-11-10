'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            onLogin(true);
        }
    }, [onLogin]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAuthenticated', 'true');
            onLogin(true);
        } else {
            alert('Usuário ou senha incorretos');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        router.push('/');
    };

    const handleRegister = () => {
        router.push('/registro');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Usuário:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="mt-3 d-flex justify-content-between">
                            <Button variant="dark" type="submit" className="me-2" style={{ flex: 1 }}>
                                Login
                            </Button>
                            <Button variant="secondary" onClick={handleLogout} style={{ flex: 1, backgroundColor: '#6c757d', borderColor: '#6c757d' }}>
                                Sair
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
