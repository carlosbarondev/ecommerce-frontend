import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, CloseButton, Col, Image, Row } from "react-bootstrap"

import { stepChange } from "../../actions/ui";
import { productStartAdd } from "../../actions/cart";


export const CartScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { carrito } = useSelector(state => state.cart);

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

    return (
        <div className="container">
            <Row className="mt-5">
                <Col lg={12} xl={8}>
                    <Card>
                        <Card.Header as="h5" className="disable-card-header">
                            <div className="row align-items-center text-center">
                                <div className="col-md-2">
                                    <Card.Text>
                                        Artículo
                                    </Card.Text>
                                </div>
                                <div className="col-md-3">

                                </div>
                                <div className="col-md-2">
                                    <Card.Text>
                                        Precio
                                    </Card.Text>
                                </div>
                                <div className="col-md-2">
                                    <Card.Text>
                                        Unidades
                                    </Card.Text>
                                </div>
                                <div className="col-md-2">
                                    <Card.Text>
                                        Total
                                    </Card.Text>
                                </div>
                                <div className="col-md-1">

                                </div>
                            </div>
                        </Card.Header>
                        <Card.Header as="h5" className="enable-card-header">
                            <div className="row align-items-center">
                                <Card.Text>
                                    Artículo
                                </Card.Text>
                            </div>
                        </Card.Header>
                    </Card>
                    {
                        carrito.map(cart => (
                            <Card key={cart.producto._id}>
                                <Card.Body>
                                    <div className="row align-items-center">
                                        <div className="col-md-2 col-sm-2">
                                            <Image src={cart.producto.img} fluid />
                                        </div>
                                        <div className="col-md-3 col-sm-10">
                                            <Card.Title>{cart.producto.nombre}</Card.Title>
                                        </div>
                                        <div className="col-md-2 col-sm-3 text-center">
                                            <Card.Text className="disable-card-precio">
                                                {cart.producto.precio} €
                                            </Card.Text>
                                        </div>
                                        <div className="col-md-2 col-sm-3">
                                            <div className="input-group">
                                                <button onClick={() => handleSubtract(cart.producto, cart.unidades)} className="border" style={{ height: "30px", width: "30px", marginLeft: "auto" }}>-</button>
                                                <input className="text-center border" type="text" value={cart.unidades} readOnly style={{ height: "30px", width: "30px" }} />
                                                <button onClick={() => handleAdd(cart.producto)} className="border" style={{ height: "30px", width: "30px", marginRight: "auto" }}>+</button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-sm-3 text-center">
                                            <Card.Text>
                                                <span className="enable-span">Total:&nbsp;</span>{(cart.producto.precio * cart.unidades).toFixed(2)} €
                                            </Card.Text>
                                        </div>
                                        <div className="col-md-1 col-sm-3">
                                            <CloseButton />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </Col>
                <Col lg={12} xl={4}>
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
        </div>
    )
}