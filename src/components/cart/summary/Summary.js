import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetchConToken } from "../../../helpers/fetch";
import { SummaryModal } from "./SummaryModal";
import { cartClear } from "../../../actions/cart";


export const Summary = () => {

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);
    const { carrito } = useSelector(state => state.cart);

    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);
    const [resumen, setResumen] = useState();

    useEffect(() => {

        async function fetchData() {

            if (carrito.length > 0) { // Se ejecuta cuando el usuario llega desde la pantalla de pago

                const pago = await fetchConToken(`pagos/${searchParams.get("payment_intent")}`);

                const bodyPago = await pago.json();

                if (bodyPago.msg) { // Si hay errores
                    Swal.fire('Error', bodyPago.msg, 'error');
                } else {

                    const usuario = await fetchConToken(`pagos/usuario/${uid}`);

                    const bodyUsuario = await usuario.json();

                    if (bodyUsuario.msg) { // Si hay errores
                        Swal.fire('Error', bodyUsuario.msg, 'error');
                    } else {

                        const pedido = await fetchConToken(`pedidos`, {
                            idPedido: searchParams.get("payment_intent"),
                            usuario: uid,
                            producto: carrito,
                            fecha: new Date(bodyPago.paymentIntent.created * 1000),
                            direccionEnvio: bodyUsuario.customer.shipping,
                            direccionFacturacion: bodyUsuario.customer.address,
                            metodoPago: bodyPago.paymentIntent.charges.data[0].payment_method_details.card.brand,
                            digitos: bodyPago.paymentIntent.charges.data[0].payment_method_details.card.last4,
                            total: bodyPago.paymentIntent.amount
                        }, 'POST');

                        const bodyPedido = await pedido.json();

                        if (bodyPedido.msg) { // Si hay errores
                            Swal.fire('Error', bodyPedido.msg, 'error');
                        } else {
                            console.log('Hola juana'); //TODO
                            setResumen(bodyPedido);
                            localStorage.removeItem("carrito");
                            dispatch(cartClear());
                            localStorage.setItem('pedido', JSON.stringify(bodyPedido));
                            setChecking(true);
                        }

                    }
                }
            } else { // Se ejecuta cuando el usuario recarga el navegador
                console.log('Hola Mundo'); //TODO
                setResumen(JSON.parse(localStorage.getItem('pedido')));
                setChecking(true);
            }
        }
        fetchData();
    }, [carrito, dispatch, searchParams, uid]);

    return (
        checking &&
        <Container>
            {console.log(resumen)}
            {//TODO
            }
            <Card>
                <Card.Header as="h4">Detalles del pedido</Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="col-md-5">
                            <Card.Title>Dirección de envío</Card.Title>
                            <Card.Text>
                                {resumen.direccionEnvio.name}
                                <br />
                                {resumen.direccionEnvio.address.line1} {resumen.direccionEnvio.address.line2}
                                <br />
                                {resumen.direccionEnvio.address.postal_code}
                                <br />
                                {resumen.direccionEnvio.address.city} {resumen.direccionEnvio.address.state}
                                <br />
                                {resumen.direccionEnvio.address.country}
                            </Card.Text>
                        </Col>
                        <Col className="col-md-5">
                            <Card.Title>Método de pago</Card.Title>
                            <Card.Text>
                                <Image className="mg-fluid" style={{ "height": "25px" }} src="https://images-na.ssl-images-amazon.com/images/G/30/checkout/payselect/card-logos-small/visa._CB658923706_.gif" />
                                <span> **** {resumen.digitos}</span>
                            </Card.Text>
                        </Col>
                        <Col className="col-md-2">
                            <Card.Title>Importe total:</Card.Title>
                            <Card.Text>
                                <b>EUR {resumen.total / 100}</b>
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {
                resumen.producto.map(prod => (
                    <Card key={prod.producto._id} className="justify-content-center">
                        <Card.Body>
                            <div className="row align-items-center">
                                <Col className="col-sm-2 col-md-1">
                                    <Card.Img src={prod.producto.img} fluid="true" />
                                </Col>
                                <Col className="col-sm-7 col-md-5">
                                    <Card.Title>{prod.producto.nombre}</Card.Title>
                                </Col>
                                <Col className="col-sm-3 col-md-2 text-center">
                                    <Card.Text>
                                        <b>{prod.producto.precio} €</b>
                                    </Card.Text>
                                    <Card.Text>
                                        Unidades: {prod.unidades}
                                    </Card.Text>
                                </Col>
                                <Col className="col-sm-12 col-md-4 text-center">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setModalShow(prod.producto._id)}
                                    >
                                        Escribir una opinión sobre el producto
                                    </Button>
                                </Col>
                            </div>
                            <SummaryModal
                                id={prod.producto._id}
                                setModalShow={setModalShow}
                                show={modalShow === prod.producto._id}
                                onHide={() => setModalShow("")}
                            />
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    )
}