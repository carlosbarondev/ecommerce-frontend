import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';

import { fetchConToken } from "../../../helpers/fetch";


export const Categories = () => {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`categorias?visibles=${`{"estado": {"$in" : ["true", "false"]}}`}&ordenar=""`);
                const body = await resp.json();
                setCategorias(body.categorias);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error, 'error');
            }
        }
        fetchData();
    }, []);

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Gestión de Categorías</h3>
            <Card className="mt-4">
                <Card.Header>
                    <Row>
                        <Col xs={3} sm={3}>
                            Nombre
                        </Col>
                        <Col xs={3} sm={3}>
                            Ventas
                        </Col>
                        <Col xs={3} sm={3}>
                            Estado
                        </Col>
                        <Col xs={3} sm={3}>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup variant="flush">
                    {
                        categorias.map(cat =>
                            <ListGroup.Item key={cat._id}>
                                <Row>
                                    <Col xs={3} sm={3}>
                                        {cat.nombre}
                                    </Col>
                                    <Col xs={3} sm={3}>
                                        {cat.vendidos}
                                    </Col>
                                    <Col xs={3} sm={3}>
                                        {
                                            cat.estado ? <span className="text-success">Activa</span> : <span className="text-danger">Deshabilitada</span>
                                        }
                                    </Col>
                                    <Col xs={3} sm={3} className="mt-2 mt-sm-0">
                                        <div className="d-grid">
                                            <Button
                                                className="me-1"
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => navigate(`/panel/categorias/${normalizeText(cat.nombre.replace(/\s+/g, '-'))}`)}
                                            >
                                                Editar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Card>
        </div>
    )
}