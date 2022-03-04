import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';

import { fetchConToken } from "../../../helpers/fetch";
import { CategoryAddModal } from "./CategoryAddModal";


export const Categories = () => {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState(false);
    const [modalShow, setModalShow] = useState(false);
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
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, []);

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Gestión de Categorías</h3>
            <Card className="mt-4">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col xs={5} sm={4} md={4}>
                            Nombre
                        </Col>
                        <Col xs={0} sm={0} md={2} className="disable-card-header">
                            Ventas
                        </Col>
                        <Col xs={3} sm={4} md={2}>
                            Estado
                        </Col>
                        <Col xs={4} sm={4} md={4}>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup variant="flush">
                    {
                        categorias.map(cat =>
                            <ListGroup.Item key={cat._id}>
                                <Row className="align-items-center">
                                    <Col xs={5} sm={4} md={4}>
                                        <Link
                                            className="linkProducto"
                                            to={`/${normalizeText(cat.nombre.replace(/\s+/g, "-"))}`}>
                                            {cat.nombre}
                                        </Link>
                                    </Col>
                                    <Col xs={0} sm={0} md={2} className="disable-card-header">
                                        {cat.vendidos}
                                    </Col>
                                    <Col xs={3} sm={4} md={2}>
                                        {
                                            cat.estado ? <span className="text-success">Activa</span> : <span className="text-danger">Deshabilitada</span>
                                        }
                                    </Col>
                                    <Col xs={4} sm={4} md={4} className="mt-2 mt-sm-0">
                                        <div className="d-grid">
                                            <Button
                                                className="me-1"
                                                variant="outline-primary"
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
            <Button className="mt-4" onClick={() => setModalShow("open")}>
                Agregar Categoría
            </Button>
            <CategoryAddModal
                categorias={categorias}
                setCategorias={setCategorias}
                setModalShow={setModalShow}
                setChecking={setChecking}
                show={modalShow === "open"}
                onHide={() => setModalShow("")}
            />
        </div>
    )
}