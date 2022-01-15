import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetchConToken } from "../../../helpers/fetch";
import { SummaryModal } from "./SummaryModal";
import { cartClear } from "../../../actions/cart";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const Summary = () => {

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { uid, nombre } = useSelector(state => state.auth);
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
                            setResumen(bodyPedido);
                            localStorage.removeItem("carrito");
                            dispatch(cartClear());
                            localStorage.setItem('pedido', JSON.stringify(bodyPedido));
                            setChecking(true);
                        }

                    }
                }
            } else { // Se ejecuta cuando el usuario recarga el navegador
                setResumen(JSON.parse(localStorage.getItem('pedido')));
                setChecking(true);
            }
        }
        fetchData();
    }, [carrito, dispatch, searchParams, uid]);

    const lol = () => {

        const fecha = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        let rows = [];
        rows.push(['Descripción', 'Cantidad', 'Precio Unitario', 'Precio Total']);
        resumen.producto.map(p => rows.push([p.producto.nombre, p.unidades, p.producto.precio, p.producto.precio * p.unidades]));

        const docDefinition = {
            content: [
                {
                    text: `\n\n`
                },
                {
                    columns: [
                        {
                            text: `
                                ${nombre}
                                ${resumen.direccionFacturacion.line1} ${resumen.direccionFacturacion.line2}
                                ${resumen.direccionFacturacion.city} ${resumen.direccionFacturacion.state} ${resumen.direccionFacturacion.postal_code}
                                ${resumen.direccionFacturacion.country}
                            `,
                            style: {
                                fontSize: 12
                            }
                        },
                        {

                        },
                        {
                            table: {
                                widths: [100],
                                heights: [50],
                                body: [
                                    [
                                        {
                                            text: `Pagado`,
                                            fillColor: '#DAF9F9',
                                            style: "pagado"
                                        },
                                    ]
                                ],
                            }
                        }
                    ],
                    style: { lineHeight: 1.3 },
                },
                {
                    text: `\n\n\n`
                },
                {
                    text: `Si tienes preguntas sobre tus pedidos, visita https://www.amazon.es/contacto`, //TODO Contacto
                    style: "small"
                },
                { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
                {
                    text: `\n`
                },
                {
                    columns: [
                        {
                            text: [
                                {
                                    text: `Dirección de facturación`,
                                    style: 'subheader'
                                },
                                {
                                    text: `
                                        ${nombre}
                                        ${resumen.direccionFacturacion.line1} ${resumen.direccionFacturacion.line2}
                                        ${resumen.direccionFacturacion.city} ${resumen.direccionFacturacion.state} ${resumen.direccionFacturacion.postal_code}
                                        ${resumen.direccionFacturacion.country}
                                    `
                                }
                            ]
                        },
                        {
                            text: [
                                {
                                    text: `Dirección de envío`,
                                    style: 'subheader'
                                },
                                {
                                    text: `
                                        ${resumen.direccionEnvio.name}
                                        ${resumen.direccionEnvio.address.line1} ${resumen.direccionEnvio.address.line2}
                                        ${resumen.direccionEnvio.address.city} ${resumen.direccionEnvio.address.state} ${resumen.direccionEnvio.address.postal_code}
                                        ${resumen.direccionEnvio.address.country}
                                    `
                                }
                            ]
                        },
                        {
                            text: [
                                {
                                    text: `Vendido por`,
                                    style: 'subheader'
                                },
                                {
                                    text: `
                                        ${nombre}
                                        ${resumen.direccionFacturacion.line1} ${resumen.direccionFacturacion.line2}
                                        ${resumen.direccionFacturacion.city} ${resumen.direccionFacturacion.state} ${resumen.direccionFacturacion.postal_code}
                                        ${resumen.direccionFacturacion.country}
                                    `
                                }
                            ]
                        },
                    ],
                    style: { lineHeight: 1.3 },
                },
                { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
                {
                    text: `\n`
                },
                {
                    columns: [
                        {
                            text: [
                                {
                                    text: `Información del pedido`,
                                    style: 'subheader'
                                },
                                {
                                    text: `
                                        Fecha del pedido: ${fecha.toLocaleDateString("es-ES", options)}
                                        Número del pedido: ${resumen.idPedido}
                                    `
                                }
                            ]
                        },
                    ],
                    style: { lineHeight: 1.3 },
                },
                { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
                {
                    text: `\n`
                },
                {
                    text: `Detalles del documento\n`,
                    style: 'header'
                },
                { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
                {
                    text: `\n`
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: [321, '*', '*', '*'],
                        body: rows
                    }
                },
                {
                    text: `Total: ${resumen.total / 100} €`,
                    style: 'total'
                },
            ],
            styles: {
                header: {
                    fontSize: 12,
                    bold: true
                },
                subheader: {
                    fontSize: 11,
                    bold: true
                },
                total: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'right',
                },
                pagado: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 13, 0, 0]
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                fontSize: 8,
                columnGap: 75
            }
        };
        pdfMake.createPdf(docDefinition).open();
    }

    return (
        checking &&
        <Container>
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
            <Button onClick={lol}>GG</Button>
        </Container>
    )
}