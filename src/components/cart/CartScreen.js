import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Image, Row } from "react-bootstrap"
import Swal from "sweetalert2";

import { stepChange } from "../../actions/ui";
import { cartClear, productDelete, productStartAdd } from "../../actions/cart";


export const CartScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { carrito } = useSelector(state => state.cart);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let cont = 0;
        carrito.map(producto => cont += producto.unidades);
        setTotal(cont);
    }, [carrito]);


    const handleClick = () => {
        dispatch(stepChange(2));
        localStorage.setItem('step', 2);
        navigate("/shipping");
    }

    const handleSubtract = (producto, unidades) => {
        if (unidades >= 2) {
            dispatch(productStartAdd(producto, -1, true));
        }
    }

    const handleAdd = (producto) => {
        dispatch(productStartAdd(producto, 1, true));
    }

    const handleDelete = (id) => {
        dispatch(productDelete(id));
    }

    const handleClear = () => {
        dispatch(cartClear());
        Swal.fire('Cesta vaciada', {}, 'success');
    }

    return (
        <>
            <div className="mt-5 mb-2" style={{ "fontSize": "22px" }}><b>{`(${total})`}</b> {total !== 1 ? "Artículos" : "Artículo"} en <b>tu cesta</b></div>
            <Row>
                <Col md={12} lg={8}>
                    <Card>
                        <Card.Header as="h5" className="disable-card-header">
                            <Row className="align-items-center text-center">
                                <Col md={2}>
                                    <Card.Text>
                                        Artículo
                                    </Card.Text>
                                </Col>
                                <Col md={5}>
                                </Col>
                                <Col md={3}>
                                    <Card.Text>
                                        Unidades
                                    </Card.Text>
                                </Col>
                                <Col md={2}>
                                    <Card.Text>
                                        Total
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Header as="h5" className="enable-card-header">
                            <Row className="align-items-center">
                                <Card.Text>
                                    Artículo
                                </Card.Text>
                            </Row>
                        </Card.Header>
                    </Card>
                    {
                        carrito.map(cart => (
                            <Card key={cart.producto._id}>
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col xs={2} sm={2} md={2}>
                                            <Image src={cart.producto.img} fluid />
                                        </Col>
                                        <Col xs={10} sm={10} md={5}>
                                            <Link className="linkProducto" style={{ "fontSize": "20px" }} to={`/${cart.producto._id}`}>{cart.producto.nombre}</Link>
                                            <div>{cart.producto.precio} €</div>
                                            <button className="botonLinkProducto mt-2" onClick={() => handleDelete(cart.producto._id)}>Eliminar</button>
                                        </Col>
                                        <Col xs={8} sm={8} md={3}>
                                            <div className="input-group mt-2">
                                                <button onClick={() => handleSubtract(cart.producto, cart.unidades)} className="border" style={{ height: "30px", width: "30px", marginLeft: "auto" }}>-</button>
                                                <input className="text-center border" type="text" value={cart.unidades} readOnly style={{ height: "30px", width: "30px" }} />
                                                <button onClick={() => handleAdd(cart.producto)} className="border" style={{ height: "30px", width: "30px", marginRight: "auto" }}>+</button>
                                            </div>
                                        </Col>
                                        <Col xs={4} sm={4} md={2} className="text-center">
                                            <Card.Text className="mt-2">
                                                <span className="enable-span">Total:&nbsp;</span>{(cart.producto.precio * cart.unidades).toFixed(2)} €
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                    }
                    <Row className="mt-3">
                        <Col xs={5} md={4}>
                            <Button variant="outline-secondary" onClick={handleClear}><i className="fa-solid fa-trash"></i> Vaciar cesta</Button>
                        </Col>
                        <Col xs={2} md={4}></Col>
                        <Col xs={5} md={4} className="d-flex justify-content-end">
                            <Button variant="outline-secondary" onClick={() => navigate("/")}>Seguir comprando</Button>
                        </Col>
                    </Row>
                </Col>
                <Col md={12} lg={4}>
                    <Card className='sticky-top'>
                        <Card.Header as="h5" className="text-center">TOTAL</Card.Header>
                        <Card.Body className="text-center">
                            <Card.Title>{carrito.reduce((n, { unidades, producto }) => n + unidades * producto.precio, 0).toFixed(2)} €</Card.Title>
                            <div className="mt-4 d-grid gap-2">
                                <Button className="mt-1" variant="warning" size="lg" onClick={handleClick}>
                                    Realizar Pedido
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}