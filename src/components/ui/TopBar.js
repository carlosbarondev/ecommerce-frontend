import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Button, Form, FormControl } from "react-bootstrap"

import { Canvas } from "./Canvas";
import { startLogout } from "../../actions/auth";
import { cartInit } from "../../actions/cart";

export const TopBar = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);

    useEffect(() => { // Restaura el carrito de compras al recargar el navegador
        const oldUid = localStorage.getItem('uid');
        if (oldUid === uid) {
            const oldCart = JSON.parse(localStorage.getItem('carrito'));
            if (oldCart)
                dispatch(cartInit(oldCart));
        }
    }, [dispatch, uid]);

    const carro = useSelector(state => state.cart);
    const { carrito } = carro;

    useEffect(() => { // Guarda el carrito de compras al recargar el navegador
        localStorage.setItem('carrito', JSON.stringify(carro));
        localStorage.setItem('uid', uid);
    }, [carro, uid]);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const getUnidades = () => { // Suma las unidades de los productos del carrito
        if (carrito.length > 0) {
            const unidades = carrito.reduce((n, { unidades }) => n + unidades, 0);
            return unidades;
        } else {
            return 0;
        }
    }

    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top">
                <Container fluid>
                    <Link
                        className="navbar-brand"
                        to="/"
                    >
                        Ecommerce
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                            <Button
                                variant="danger"
                                onClick={handleLogout}
                            >
                                Identificate
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                    <span className="fa-layers fa-fw fa-3x hv" onClick={handleShow}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="fa-layers-counter" style={{ background: 'Tomato', fontSize: '60px' }}>{getUnidades()}</span>
                    </span>
                </Container>
            </Navbar>
            <Canvas show={show} setShow={setShow} />
        </>
    )
}