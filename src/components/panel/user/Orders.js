import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetchConToken } from "../../../helpers/fetch";
import { invoicePdf } from "../../../helpers/invoicePdf";


export const Orders = () => {

    const navigate = useNavigate();

    const { nombre, uid } = useSelector(state => state.auth);

    const [pedidos, setPedidos] = useState();
    const [checking, setChecking] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchConToken(`pedidos/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    setPedidos(body.pedidos);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error, 'error');
            }
        }
        fetchData();
    }, [uid]);

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Mis Pedidos</h3>
            {
                pedidos.map(pedido => (
                    <Card key={pedido._id} className="mt-4">
                        <Card.Header>
                            <Row className="ms-2">
                                <Col md={3} className="mb-2">
                                    <Row>
                                        Pedido realizado
                                    </Row>
                                    <Row>
                                        {new Date(pedido.fecha).toLocaleDateString("es-ES", options)}
                                    </Row>
                                </Col>
                                <Col md={3} className="mb-2">
                                    <Row>
                                        Total
                                    </Row>
                                    <Row>
                                        {pedido.total / 100}€
                                    </Row>
                                </Col>
                                <Col className="mb-2">
                                    <Row className="me-1 disable-float">
                                        Pedido nº {pedido._id}
                                    </Row>
                                    <Row className="disable-float">
                                        <span>
                                            <button className="botonLink" onClick={() => navigate("/panel/pedidos/detalles", {
                                                state: {
                                                    pedido: pedido
                                                }
                                            })}>Ver los detalles del pedido</button>
                                            <div className="vr ms-2 me-2"></div>
                                            <button className="botonLink" onClick={() => invoicePdf(nombre, pedido)}>Factura PDF</button>
                                        </span>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {
                                pedido.producto.map(p => (
                                    <Row className="align-items-center mb-3" key={p.producto._id}>
                                        <Col xs={2} md={1}>
                                            <Card.Img src={p.producto.img} />
                                        </Col>
                                        <Col xs={10} md={11}>
                                            <Link className="linkProducto" style={{ "fontSize": "20px" }} to={`/${p.producto.categoria.nombre}/${p.producto.subcategoria.nombre}/${p.producto.nombre.replace(/\s+/g, "-")}`}>{p.producto.nombre}</Link>
                                            <div style={{ "fontSize": "14px" }}>Cantidad: {p.unidades}</div>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
};