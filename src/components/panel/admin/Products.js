import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';

import { fetchConToken } from "../../../helpers/fetch";
import { ProductAddModal } from "./ProductAddModal";


export const Products = () => {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState(false);
    const [productos, setProductos] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`productos?visibles=${`{"estado": {"$in" : ["true", "false"]}}`}&ordenar=""`);
                const body = await resp.json();
                setProductos(body.productos);
                const resp2 = await fetchConToken(`categorias?visibles=${`{"estado": {"$in" : ["true", "false"]}}`}&ordenar=""`);
                const body2 = await resp2.json();
                setCategorias(body2.categorias);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id, estado) => {
        try {
            if (estado) {
                const resp = await fetchConToken(`productos/${id}`, {}, 'DELETE');
                const body = await resp.json();
                const newProductos = [...productos];
                newProductos[productos.findIndex(prod => prod._id === body.productoBorrado._id)].estado = false;
                setProductos(newProductos);
                Swal.fire('Producto deshabilitado', "", 'success');
            } else {
                const resp = await fetchConToken(`productos/${id}`, { estado: true }, 'PUT');
                const body = await resp.json();
                const newProductos = [...productos];
                newProductos[productos.findIndex(prod => prod._id === body._id)].estado = true;
                setProductos(newProductos);
                Swal.fire('Usuario habilitado', "", 'success');
            }
        } catch (error) {
            console.log(error.message);
            return Swal.fire('Error', error.message, 'error');
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Gestión de Productos</h3>
            <Card className="mt-4">
                <Card.Header>
                    <Row>
                        <Col xs={4} sm={4}>
                            Nombre
                        </Col>
                        <Col xs={2} sm={2}>
                            Ventas
                        </Col>
                        <Col xs={2} sm={2}>
                            Estado
                        </Col>
                        <Col xs={4} sm={4}>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup variant="flush">
                    {
                        productos.map(prod =>
                            <ListGroup.Item key={prod._id}>
                                <Row>
                                    <Col xs={4} sm={4}>
                                        {prod.nombre}
                                    </Col>
                                    <Col xs={2} sm={2}>
                                        {prod.vendido}
                                    </Col>
                                    <Col xs={2} sm={2}>
                                        {
                                            prod.estado ? <span className="text-success">Activo</span> : <span className="text-danger">Deshabilitado</span>
                                        }
                                    </Col>
                                    <Col xs={4} sm={4} className="mt-2 mt-sm-0">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Button
                                                className="me-1"
                                                style={{ "width": "80px" }}
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => navigate(`/panel/categorias/${normalizeText(prod.nombre.replace(/\s+/g, '-'))}`)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                style={{ "width": "80px" }}
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => handleDelete(prod._id, prod.estado)}
                                            >
                                                {
                                                    prod.estado ? "Eliminar" : "Habilitar"
                                                }
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
                Agregar Producto
            </Button>
            <ProductAddModal
                categorias={categorias}
                setModalShow={setModalShow}
                show={modalShow === "open"}
                onHide={() => setModalShow("")}
            />
        </div>
    )
}