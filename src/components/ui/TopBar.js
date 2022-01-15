import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Button, Form, FormControl } from "react-bootstrap"

import { Canvas } from "./Canvas";
import { startLogout } from "../../actions/auth";
import { canvasChange } from "../../actions/ui";

export const TopBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);
    const carro = useSelector(state => state.cart);
    const { carrito } = carro;

    useEffect(() => { // Guarda el carrito de compras al recargar el navegador
        localStorage.setItem('carrito', JSON.stringify(carro));
    }, [carro]);

    const handleShow = () => dispatch(canvasChange());

    const handleLogout = () => {
        dispatch(startLogout());
        navigate("/");
    }

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
                        </Form>
                        {
                            (!!uid &&
                                <Button
                                    variant="danger"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesion
                                </Button>)
                            || (!uid &&
                                <Button
                                    variant="danger"
                                    onClick={() => navigate("/login", { replace: true })}
                                >
                                    Identificate
                                </Button>)
                        }
                    </Navbar.Collapse>
                    <span className="fa-layers fa-fw fa-3x hv" onClick={handleShow}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="fa-layers-counter" style={{ background: 'Tomato', fontSize: '60px' }}>{getUnidades()}</span>
                    </span>
                </Container>
            </Navbar>
            <Canvas />
        </>
    )
}