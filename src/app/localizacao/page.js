'use client';

import Pagina from "@/app/components/Pagina";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Page({ params }) {
    return (
        <Pagina titulo="Localização" semFaixa={true}>
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <h2 style={{ color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Contatos Livraria</h2>
                        <Card style={{ backgroundColor: '#f8f9fa', border: 'none', marginBottom: '10px' }}>
                            <Card.Body>
                                <Card.Title>Endereço</Card.Title>
                                <Card.Text>QS 01 Rua 210, lote 40 Pistão Sul, Taguatinga - DF, 71950-904</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ backgroundColor: '#f8f9fa', border: 'none', marginBottom: '10px' }}>
                            <Card.Body>
                                <Card.Title>Telefone</Card.Title>
                                <Card.Text>(11) 1234-5678</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ backgroundColor: '#f8f9fa', border: 'none', marginBottom: '10px' }}>
                            <Card.Body>
                                <Card.Title>Email</Card.Title>
                                <Card.Text>contato.lvr@livraria.com</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ backgroundColor: '#f8f9fa', border: 'none', marginBottom: '10px' }}>
                            <Card.Body>
                                <Card.Title>Horário de Funcionamento</Card.Title>
                                <Card.Text>Seg-Sex: 8h - 18h, Sáb: 8h - 14h</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7676.575982321169!2d-48.044011!3d-15.841453999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a328bd8bc60c1%3A0xd082313d70393121!2sTaguatinga%20Shopping!5e0!3m2!1spt-BR!2sus!4v1731255132065!5m2!1spt-BR!2sus" 
                            width="600" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
