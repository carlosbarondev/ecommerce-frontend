import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar, Button, Form, FormControl, Offcanvas } from "react-bootstrap"
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import { MenuCanvas } from "./MenuCanvas";
import { CartCanvas } from "./CartCanvas";
import { cartCanvasChange, menuCanvasChange } from "../../actions/ui";


const routes = [
    { path: '/:CategoriaNombre/:SubCategoriaNombre/:ProductoNombre', breadcrumb: null },
    { path: '/cart', breadcrumb: "Carrito" },
    { path: '/panel/datos', breadcrumb: "Mis datos" },
    { path: '/panel/deseos', breadcrumb: "Lista de deseos" },
    { path: '/panel/pedidos/detalles', breadcrumb: null },
];

export const TopBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { uid } = useSelector(state => state.auth);
    const carro = useSelector(state => state.cart);
    const { carrito } = carro;

    const [show, setShow] = useState(false);
    const breadcrumbs = useBreadcrumbs(routes);

    useEffect(() => { // Guarda el carrito de compras en el localStorage cuando se modifica el carrito
        localStorage.setItem('carrito', JSON.stringify(carro));
    }, [carro]);

    const handleShowMenu = () => dispatch(menuCanvasChange());
    const handleShowCart = () => dispatch(cartCanvasChange());

    const handleClose = () => setShow(false);
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
            <Navbar bg="light" expand={false} sticky="top" style={{ "padding": "0" }}>
                <Container fluid style={{ "paddingLeft": "0", "paddingRight": "0" }}>
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex">
                            <Link
                                className="navbar-brand ms-3"
                                to="/"
                            >
                                Ecommerce
                            </Link>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 ms-5"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            {
                                (!!uid &&
                                    <Button
                                        className="ms-5"
                                        variant="danger"
                                        onClick={handleShowMenu}
                                    >
                                        Mi cuenta
                                    </Button>)
                                || (!uid &&
                                    <Button
                                        className="ms-5"
                                        variant="danger"
                                        onClick={() => navigate("/login")}
                                    >
                                        Identificate
                                    </Button>)
                            }
                            <span className="fa-layers fa-fw fa-3x hv ms-5" onClick={handleShowCart}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="fa-layers-counter" style={{ background: 'Tomato', fontSize: '60px' }}>{getUnidades()}</span>
                            </span>
                        </div>
                        <div className="d-flex align-items-center border-top border-bottom" style={{ "height": "40px", "fontSize": "14px" }}>
                            <button
                                className="ms-5 me-4 border-0"
                                style={{ "backgroundColor": "#F8F9FA" }}
                                onClick={handleShow}
                            >
                                <i className="fa-solid fa-bars fa-lg"></i>
                                <b className="ms-2">Todas las categorías</b>
                            </button>
                            <Offcanvas
                                show={show}
                                onHide={handleClose}
                                scroll={true}
                                backdrop={true}
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    Some text as placeholder. In real life you can have the elements you
                                    have chosen. Like, text, images, lists, etc.
                                </Offcanvas.Body>
                            </Offcanvas>
                            {
                                location.pathname !== "/" && location.pathname !== "/summary" && breadcrumbs.map(({
                                    match,
                                    breadcrumb,
                                }, index) => (
                                    <span key={match.pathname}>
                                        <NavLink to={match.pathname} style={{ "textDecoration": "none", "color": "black" }}>{breadcrumb}</NavLink>
                                        {
                                            index < breadcrumbs.length - 1 && <span className="ms-1 me-1">{">"}</span>
                                        }
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </Container>
            </Navbar>
            <MenuCanvas />
            <CartCanvas />
        </>
    )
}