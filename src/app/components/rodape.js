'use client';

import { Container, Row, Col } from 'react-bootstrap';

export default function Rodape() {
    return (
        <footer className="bg-dark text-white mt-4">
            <Container fluid>
                <Row className="justify-content-center text-center py-2">
                    <Col>
                        <p>© 2024 Livraria. Todos os direitos reservados.</p>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    left: 0;
                }
                p {
                    margin-bottom: 0.5rem;
                    text-align: center;
                }
            `}</style>
        </footer>
    );
}
